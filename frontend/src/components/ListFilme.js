import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

//lista todos os filmes do mongodb
const ListFilme = () => {
  const [filmes, setFilme] = useState([]);

  useEffect(() => {
    getFilmes();
  }, []);

  const getFilmes = async () => {
    const response = await axios.get("http://localhost:5000/filmes");
    setFilme(response.data);
  };

  const deleteFilme = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/filmes/${id}`);
      //depois de apagar, retorna a lista que sobrou
      getFilmes();
    } catch (error) {
      console.log(error);
    }
  };
  
  //monta uma tabela
  return (
    <div className="columns mt-5">
      <div className="column is-full">
        <Link to="/" className="button is-success">
          Home
        </Link>
        <Link to="add" className="button is-success">
          Adicionar novo
        </Link>
        <table className="table is-striped is-fullwidth mt-2">
          <thead>
            <tr>
              <th>ID</th>
              <th>Capa</th>
              <th>Título</th>
              <th>Sinopse</th>
              <th>Data Lançamento</th>
              <th>Gênero</th>
              <th>Trailer</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {filmes.map((filme, index) => (
              <tr key={filme._id}>
                <td>{index + 1}</td>
                <td><img src={filme.capa_url} alt="Capa do Filme" /></td>
                <td>{filme.titulo}</td>
                <td>{filme.sinopse}</td>
                <td>{new Date(filme.data_lancamento).toLocaleDateString('pt-BR')}</td>
                <td>{filme.genero}</td>
                <td><a href={filme.trailer}>Link para o trailer</a></td>
                <td>
                  <Link
                    to={`edit/${filme._id}`}
                    className="button is-info is-small"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => deleteFilme(filme._id)}
                    className="button is-danger is-small"
                  >
                    Apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListFilme;
