const Sequelize = require('sequelize');
const cheerio = require('cheerio');
const getUrls = require('get-urls');
const puppeteer = require('puppeteer');

const DefaultService = require('./DefaultService');
const {
    Models: { MODEL_SCRAP, MODEL_LINK },
    Link: { LINK_IMAGE, LINK_VIDEO }
} = require('@app/core');

const Op = Sequelize.Op;

const getAllByTag = ($, tag) => {
    const items = [];
    $(tag).each((index, item) => {
        let link = $(item).attr('src');
        if (link) items.push(link);
    });
    return items;
};

class ScrapService extends DefaultService {
    constructor() {
        super(MODEL_SCRAP);
        this.ScrapModel = this.models[MODEL_SCRAP];
        this.LinkModel = this.models[MODEL_LINK];
    }

    async create({ urls: text = '' }) {
        const urls = Array.from(getUrls(text));
        const requests = urls.map(async url => {
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            await page.setViewport({ width: 1280, height: 800 });
            await page.goto(url);

            await page.waitForSelector('img', { timeout: 10000 });
            const html = await page.content();

            const $ = cheerio.load(html);

            const images = getAllByTag($, 'img');
            const videos = getAllByTag($, 'video');

            const [scrapped] = await this.ScrapModel.findOrCreate({
                where: { url },
                defaults: {
                    title: $('title')
                        .first()
                        .text()
                }
            });

            const links = await this.LinkModel.bulkCreate(
                images
                    .map(link => ({
                        website_id: scrapped.id,
                        link: link,
                        type: LINK_IMAGE
                    }))
                    .concat(
                        videos.map(link => ({
                            website_id: scrapped.id,
                            link: link,
                            type: LINK_VIDEO
                        }))
                    )
            );
            return { ...scrapped.dataValues, links };
        });
        return Promise.all(requests);
    }

    async findAll(req, paginationData) {
        const {
            query: { title: queryName = '' }
        } = req;

        const { rows: items, meta } = await this.LinkModel.paginate(paginationData, {
            include: [
                {
                    model: this.ScrapModel,
                    as: this.ScrapModel.tableName,
                    where: {
                        [Op.or]: [
                            {
                                title: {
                                    [Op.like]: `%${queryName}%`
                                }
                            },
                            {
                                url: {
                                    [Op.like]: `%${queryName}%`
                                }
                            }
                        ]
                    }
                }
            ]
        });
        return {
            rows: items,
            meta
        };
    }
}

module.exports = ScrapService;
