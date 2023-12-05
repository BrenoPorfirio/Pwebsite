import { useState } from "react"

export default function Movies({ initialData }) {
    const [searchTerm, setSearchTerm] = useState("")
    const [data, setData] = useState(initialData)

    async function searchMovies() {
        const res = await fetch(
            `https://www.omdbapi.com/?apikey=ca98445&s=${searchTerm}`
        )
        const searchData = await res.json()
        setData(searchData)
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Digite a palavra-chave"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={searchMovies}>Pesquisar</button>{" "}
            </div>
            <div>
                {data &&
                    data.Search &&
                    data.Search.map((m) => (
                        <div key={m.imdbID}>
                            <img src={m.Poster} width="180px" alt={m.Title} />
                            <h2>
                                {m.Title} --- {m.Year} --- {m.Type}
                            </h2>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=ca98445&s=redemption`)
    const initialData = await res.json()
    return {
        props: {
            initialData,
        },
    }
}