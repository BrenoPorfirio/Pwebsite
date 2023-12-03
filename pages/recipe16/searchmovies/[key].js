import { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import styles from "./styles.module.css";

async function theFetcher(url) {
    if (url === null || url === "") return { Search: "" };
    const res = await fetch(url);
    const json = await res.json();
    return json;
}

export default function SearchMovies() {
    const router = useRouter();
    const { key } = router.query;

    const [searchTerm, setSearchTerm] = useState(key || "");
    const [url, setUrl] = useState(
        `https://www.omdbapi.com/?apikey=ca98445&s=${searchTerm}`
    );
    const { data, error } = useSWR(url, theFetcher);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setUrl(`https://www.omdbapi.com/?apikey=ca98445&s=${searchTerm}`);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const isShowingMovies = searchTerm !== "" && !error;

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Digite o nome do filme..."
                    className={styles.inputSearch}
                />
            </div>

            {isShowingMovies && (
                <div className={styles.movieContainer}>
                    {data && data.Search ? (
                        <>
                            {data.Search.map((m) => (
                                <div key={m.imdbID} className={styles.movieCard}>
                                    <img
                                        src={m.Poster}
                                        alt={m.Title}
                                        className={styles.movieImage}
                                    />
                                    <div className={styles.movieInfo}>
                                        <h3 className={styles.movieTitle}>{m.Title}</h3>
                                        <p className={styles.movieYear}>{m.Year}</p>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className={styles.noResult}>Nenhum resultado encontrado</div>
                    )}
                </div>
            )}
            {error && (
                <div style={{ marginTop: 20, color: "red" }}>Erro na pesquisa</div>
            )}
        </div>
    );
}
