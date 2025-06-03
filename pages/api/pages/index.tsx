import { useEffect, useState } from 'react';

type Comic = {
  title: string;
  img: string;
  releaseDate: string;
  link: string;
};

export default function Home() {
  const [comics, setComics] = useState<Comic[]>([]);

  useEffect(() => {
    fetch('/comics.json')
      .then(res => res.json())
      .then(setComics)
      .catch(console.error);
  }, []);

  return (
    <main style={{ padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Manecomix - Fumetti Marvel in uscita</h1>
      {comics.length === 0 && <p>Caricamento fumetti...</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {comics.map((comic, i) => (
          <li key={i} style={{ marginBottom: '1.5rem' }}>
            <a href={comic.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#333' }}>
              <img src={comic.img} alt={comic.title} style={{ maxWidth: 120, marginRight: '1rem', verticalAlign: 'middle' }} />
              <strong>{comic.title}</strong> <br />
              <small>Data uscita: {comic.releaseDate}</small>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
