import useSWR from 'swr';
import { useState } from 'react';

export function TheForm({ onSubmit }) {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit();
        }
    };

    return (
        <div>
            <form>
                <label htmlFor="titleSearchString">Filtro de Título</label>
                <input
                    id="titleSearchString"
                    name="titleSearchString"
                    type="text"
                    autoComplete="true"
                    onKeyPress={handleKeyPress}
                />

                <label htmlFor="yearSearchString">Filtro de Ano</label>
                <input
                    id="yearSearchString"
                    name="yearSearchString"
                    type="text"
                    autoComplete="true"
                    onKeyPress={handleKeyPress}
                />
            </form>
        </div>
    );
}

export function TheMovies({ data, show, sortDirection, toggleSort }) {
    if (!show) return <div></div>;

    if (!data || !data.Search) return <div></div>;
    if (data.error) return <div>falha na pesquisa</div>;
    if (data.Search === '') return <div>carregando...</div>;

    const sortedMovies = [...data.Search].sort((a, b) => {
        const titleA = a.Title.toLowerCase();
        const titleB = b.Title.toLowerCase();

        if (sortDirection === 'asc') {
            return titleA.localeCompare(titleB);
        } else {
            return titleB.localeCompare(titleA);
        }
    });

    return (
        <div>
            <button onClick={toggleSort}>
                Ordenar por Título ({sortDirection === 'asc' ? 'Crescente' : 'Decrescente'})
            </button>
            {sortedMovies.map((m) => (
                <div key={m.imdbID}>
                    {m.Title} --- {m.Year}
                </div>
            ))}
        </div>
    );
}

export function TheLink({ url, handler }) {
    return (
        <div>
            <a href="/movies3.js" onClick={handler}>
                {url === '' ? 'Mostrar' : 'Ocultar'}
            </a>
        </div>
    );
}

export default function MoviesAdvanced() {
    const [state, setState] = useState({
        url: '',
        titleSearchString: '',
        yearSearchString: '',
        sortDirection: 'asc',
    });

    const { data, error } = useSWR(
        state.url,
        async (u) => {
            if (!state.url) return { Search: '' };
            const queryString = `s=${state.titleSearchString}&y=${state.yearSearchString}`;
            const res = await fetch(`${state.url}/?apiKey=ca98445&${queryString}`);
            const json = await res.json();
            return json;
        },
        {
            revalidateOnFocus: false,
        }
    );

    const onClickHandler = (e) => {
        e.preventDefault();
        toggleVisibility();
    };

    const onSubmitHandler = () => {
        let titleSearchString = document.getElementById('titleSearchString').value;
        let yearSearchString = document.getElementById('yearSearchString').value;

        if (!titleSearchString.trim()) {
            alert('O campo de título não pode estar vazio!');
            return;
        }

        setState({
            url: state.url === '' ? 'https://www.omdbapi.com' : '',
            titleSearchString,
            yearSearchString,
            sortDirection: state.sortDirection,
        });
    };

    const toggleVisibility = () => {
        setState({ ...state, url: state.url === '' ? 'https://www.omdbapi.com' : '' });
    };

    const toggleSort = () => {
        const newSortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
        setState({ ...state, sortDirection: newSortDirection });
    };

    return (
        <div>
            <TheForm onSubmit={onSubmitHandler} />
            <TheLink url={state.url} handler={onClickHandler} />
            <TheMovies
                data={data ? data : { Search: '' }}
                show={state.url !== ''}
                sortDirection={state.sortDirection}
                toggleSort={toggleSort}
            />
        </div>
    );
}
