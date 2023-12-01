import Link from "next/link"
import useSWR from "swr"

export default function Movies2() {
    const { data, error } = useSWR(
        `https://www.omdbapi.com/?apikey=ca98445&s=bagdad`,
        fetcher
    )

    if (error) return <div>Falha na requisição...</div>
    if (!data) return <div>Carregando...</div>

    return (
        <div>
            {data.Search.map((m) => (
                <div key={m.imdbID}>
                    <Link href={`movie/${m.imdbID}`}>
                        <img src={m.Poster} alt={m.Title} />
                        <h2>{m.Title}</h2>
                    </Link>
                </div>
            ))}
        </div>
    )
}

async function fetcher(url) {
    const res = await fetch(url)
    const json = await res.json()
    return json
}