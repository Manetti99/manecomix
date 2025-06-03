const axios = require('axios');
const cheerio = require('cheerio');

const MARVEL_URL = 'https://www.previewsworld.com/NewReleases';

async function scrapeMarvelComics() {
  try {
    const { data } = await axios.get(MARVEL_URL);
    const $ = cheerio.load(data);

    const comics = [];

    $('div.product').each((i, el) => {
      const publisher = $(el).find('.publisher').text().trim();
      if (publisher && publisher.toLowerCase().includes('marvel')) {
        const title = $(el).find('.title').text().trim();
        const img = $(el).find('img').attr('src');
        const releaseDate = $(el).find('.release-date').text().trim();
        const link = $(el).find('a').attr('href');

        comics.push({
          title,
          img,
          releaseDate,
          link: 'https://www.previewsworld.com' + link
        });
      }
    });

    return comics;
  } catch (error) {
    console.error('Errore scraping:', error);
    return [];
  }
}

module.exports = { scrapeMarvelComics };
