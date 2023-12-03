import useSWR from 'swr';
import { useState } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

async function theFetcher(url) {
    if (url === null || url === '') return { Search: '' };
    const res = await fetch(url);
    const json = await res.json();
    return json;
}

export function TheMovies({ data, show }) {
    if (!show) return <div></div>;
    if (data.error) return <div className="error-message">Falha na requisição</div>;
    if (data.Search === '') return <div className="loading-message">Carregando...</div>;

    return (
        <div className={styles['movies-container']}>
            {data.Search.map((m) => (
                <div key={m.imdbID} className={styles['movie-item']}>
                    <Link className={styles['movie-link']} href={`onemovie/${m.imdbID}`} passHref>
                        <img src={m.Poster} alt={m.Title} />
                        <h2>{m.Title}</h2>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export function TheLink({ url, handler }) {
    return (
        <div>
            <button className={styles['toggle-button']} onClick={handler}>
                {url === '' ? 'Mostrar' : 'Ocultar'}
            </button>
        </div>
    );
}

export default function Movies3() {
    const [url, setUrl] = useState('');
    const { data, error } = useSWR(url, theFetcher);
    const onClickHandler = (e) => {
        e.preventDefault();
        if (url === '') setUrl('https://www.omdbapi.com/?apikey=ca98445&s=bagdad');
        else setUrl('');
    };

    return (
        <div className={styles['movies-container']}>
            <TheLink url={url} handler={onClickHandler} />
            <TheMovies
                data={error ? { error: 'Erro na pesquisa' } : data ? data : { Search: '' }}
                show={url !== ''}
            />
        </div>
    );
}

