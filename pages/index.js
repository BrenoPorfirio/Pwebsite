export default function Home() {
  return (
    <div className="container">
      <h1>Minhas Receitas</h1>
      <ul>
        <li>
          <a href="/recipe12" target="_blank">
            Receita 12
          </a>
        </li>
        <li>
          <a href="/recipe13/newPage" target="_blank">
            Receita 13
          </a>
        </li>
        <li>
          <a href="/recipe14/movies" target="_blank">
            Receita 14
          </a>
        </li>
        <li>
          <a href="/recipe15/movies2" target="_blank">
            Receita 15--Movies2
          </a>
          <br />
          <a href="/recipe15/ipExtreme" target="_blank">
            Receita 15--IpExtreme
          </a>
        </li>
        <li>
          <a href="/recipe16/movies3" target="_blank">
            Receita 16
          </a>
          <br />
          <a href="/recipe16/searchmovies/[key].js" target="_blank">
            Receita 16--Busca por Key
          </a>
        </li>
        <li>
          <a href="/recipe17/movies33" target="_blank">
            Receita 17
          </a>
        </li>
      </ul>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background-color: #A7414A;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }

        .container {
          text-align: center;
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        h1 {
          background: #A7414A;
          color: #282726; 
          border-radius: 4px;
          padding: 8px;
        }

        ul {
          list-style-type: none;
          padding: 0;
        }

        li {
          margin-bottom: 10px;
          background-color: #A7414A;
          padding: 10px;
          border-radius: 4px;
        }

        a {
          text-decoration: none;
          color: #282726;
          font-weight: bold;
          transition: color 0.3s ease-in-out;
        }

        a:hover {
          color: #FFF;
        }
      `}</style>
    </div>
  );
}
