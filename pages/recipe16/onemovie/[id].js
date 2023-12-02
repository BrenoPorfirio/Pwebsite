import { useRouter } from "next/router";
import useSWR from "swr";
import styles from './styles.module.css';

export default function MovieDetail() {
    const router = useRouter();
    const { id } = router.query;

    const { data, error } = useSWR(
        id ? `https://www.omdbapi.com/?apikey=ca98445&i=${id}` : null,
        fetcher
    );

    const handleReturnClick = () => {
        router.push("/recipe16/movies3");
    };

    const ButtonReturn = ({ onClick }) => {
        return <button className={styles['button-back']} onClick={onClick}>Voltar</button>;
    };

    if (error) return <div className={styles['error-message']}>Falha na requisição...</div>;
    if (!data) return <div className={styles['loading-message']}>Carregando...</div>;

    return (
        <div className={styles['movie-detail-container']}>
            <ButtonReturn onClick={handleReturnClick} />
            <div className={styles['movie-detail-image']}>
                <img src={data.Poster} alt={data.Title} />
            </div>
            <h1 className={styles['movie-detail-title']}>{data.Title}</h1>
            <div className={styles['movie-detail-descriptions']}>
                <p>
                    <strong>Ano de Lançamento:</strong> {data.Year}
                </p>
                <p>
                    <strong>Tipo:</strong> {data.Type}
                </p>
                <p>
                    <strong>Duração:</strong> {data.Runtime}
                </p>
                <p>
                    <strong>Gênero:</strong> {data.Genre}
                </p>
                <p>
                    <strong>Enredo:</strong> {data.Plot}
                </p>
            </div>
        </div>
    );
}

async function fetcher(url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
}
