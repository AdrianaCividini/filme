import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./filme-info.css";
import api from "../../services/api";

interface Filme {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
}
function Filme() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [filme, setFilme] = useState<Filme | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`movie/${id}`, {
          params: {
            api_key: "b43ee0f5c95e87749bb31d1f361e9d6b",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          navigate("/", { replace: true });
        });
    }
    loadFilme();
    return () => {
      console.log("componente desmontado");
    };
  }, [id, navigate]);

  if (loading) {
    return <div>Carregando filme...</div>;
  }

  if (!filme) {
    return <div>Filme não encontrado</div>;
  }

  function salvarFilme() {
    if (!filme) return;
    const minhaLista = localStorage.getItem("@primeflix");
    const filmesSalvos: Filme[] = minhaLista ? JSON.parse(minhaLista) : [];

    const hasFilme = filmesSalvos.some(
      (filmeSalvo) => filmeSalvo.id === filme.id
    );

    if (hasFilme) {
      toast.warn("Esse filme ja foi salvo");
    }
    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso");
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>

      <strong>Avaliacao: {filme.vote_average}</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://youtube.com/results?search_query=${filme.title} 
          Trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}

export default Filme;
