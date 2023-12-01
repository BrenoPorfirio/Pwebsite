export default function Principal() {
    return (
        <div>
            <h1>Nova Página</h1>
            <MariaPrea mariaPrea="Morreu Maria Preá..." />
        </div>
    )
}

export function MariaPrea(props) {
    return <h2>{props.mariaPrea}</h2>
}