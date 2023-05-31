import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

//adiciona filme no mongodb
const AddFilme = () => {
  const [titulo, setTitulo] = useState("Título padrao");
  const [sinopse, setSinopse] = useState("Sinopse modelo");
  const [capa_url, setCapaUrl] = useState("https://thumbs.dreamstime.com/z/carretel-e-pipoca-de-filme-do-filme-29636508.jpg");
  const [data_lancamento, setDataLancamento] = useState("2000-01-01");
  const [genero, setGenero] = useState("Ação");
  const [trailer, setTrailer] = useState("https://youtube.com");
  
  const navigate = useNavigate();

  const saveFilme = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/filmes", {
        titulo,
        sinopse,
        capa_url,
        data_lancamento,
        genero,
        trailer,
      });
      navigate("/"); //depois de adicionar, volta pra tela inicial
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="columns mt-5">
        <div className="column is-fullwidth">
          <Link to="/" className="button is-success">
            Home
          </Link>
        </div>
      </div>
      <div className="columns is-centered mt-5">
        <div className="column is-half">
          <form onSubmit={saveFilme}>
            <div className="field">
              <label htmlFor="titulo" className="label">
                Título:
              </label>
              <div className="control">
                <input
                  type="text"
                  id="titulo"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="sinopse" className="label">
                Sinopse:
              </label>
              <div className="control">
                <textarea
                  id="sinopse"
                  value={sinopse}
                  onChange={(e) => setSinopse(e.target.value)}
                  className="textarea"
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="capa_url" className="label">
                capa_url:
              </label>
              <div className="control">
                <input
                  type="text"
                  id="capa_url"
                  value={capa_url}
                  onChange={(e) => setCapaUrl(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="data_lancamento" className="label">
                Data de Lançamento:
              </label>
              <div className="control">
                <input
                  type="date"
                  id="data_lancamento"
                  value={data_lancamento}
                  onChange={(e) => setDataLancamento(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Gênero:</label>
              <div class="control">
                <div class="select">
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
              </div>
            </div>
            <div className="field">
              <label htmlFor="trailer" className="label">
                Link para o trailer:
              </label>
              <div className="control">
                <input
                  type="text"
                  id="trailer"
                  value={trailer}
                  onChange={(e) => setTrailer(e.target.value)}
                  className="input"
                />
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button type="submit" className="button is-link">
                  Salvar
                </button>
              </div>
              <div className="control">
                <Link to="/" className="button is-danger">
                  Cancelar
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};  

export default AddFilme;
