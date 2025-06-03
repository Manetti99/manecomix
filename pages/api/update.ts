import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

const { scrapeMarvelComics } = require('../../lib/scraper');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const comics = await scrapeMarvelComics();

    const filePath = path.join(process.cwd(), 'public', 'comics.json');
    await fs.writeFile(filePath, JSON.stringify(comics, null, 2));

    res.status(200).json({ success: true, comicsCount: comics.length });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Errore durante aggiornamento fumetti' });
  }
}
