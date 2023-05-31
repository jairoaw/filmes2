import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";


const EditFilme = () => {
  const [titulo, setTitulo] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [capa_url, setCapaUrl] = useState(""); 
  const [data_lancamento, setDataLancamento] = useState("");
  const [genero, setGenero] = useState("");
  const [trailer, setTrailer] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getFilmeById();
  }, []);

  const getFilmeById = async () => {
    const response = await axios.get(`http://localhost:5000/filmes/${id}`);
    setTitulo(response.data.titulo);
    setSinopse(response.data.sinopse);
    setCapaUrl(response.data.capa_url);
    setDataLancamento(response.data.data_lancamento);
    setGenero(response.data.genero);
    setTrailer(response.data.trailer);
  };

  const updateFilme = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/filmes/${id}`, {
        titulo,
        sinopse,
        capa_url,
        data_lancamento,
        genero,
        trailer
      });
      navigate("/"); //depois de alterar, volta pra tela inicial
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5">
      <div className="column is-full">
        <Link to="/" className="button is-success">
          Home
        </Link>
        <form onSubmit={updateFilme}>
          <div className="field">
            <label className="label">Título</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título do filme"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Sinopse</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={sinopse}
                onChange={(e) => setSinopse(e.target.value)}
                placeholder="Sinopse do filme"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Url da imagem da capa</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={capa_url}
                onChange={(e) => setCapaUrl(e.target.value)}
                placeholder="capa do filme"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Data de lançamento</label>
            <div className="control">
              <input
                type="date"
                className="input"
                value={data_lancamento}
                onChange={(e) => setDataLancamento(e.target.value)}
                placeholder="Data de lançamento do filme"
              />
            </div>
          </div>
          <div>
            <label htmlFor="genero">Gênero:</label>
            <select
              id="genero"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            >
              <option value="Ação">Ação</option>
              <option value="Comédia">Comédia</option>
              <option value="Drama">Drama</option>
              <option value="Ficção científica">Ficção científica</option>
              <option value="Terror">Terror</option>
            </select>
          </div>
          <div className="field">
            <label className="label">Trailer</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={trailer}
                onChange={(e) => setTrailer(e.target.value)}
                placeholder="Trailer do filme"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success">
                Atualizar
              </button>
              <Link to="/" className="button is-black">
                Voltar
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
  
};
export default EditFilme;
