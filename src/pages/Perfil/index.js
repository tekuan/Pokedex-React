import React from 'react';
import Navbar from '../../navbar';
import api from '../../services/api';
import Ash from '../../assets/ash.png';
import './style.css';

export default function Perfil() {
  const [user, setUser] = React.useState({});
  const [pokemons, setPokemons] = React.useState([]);

  const usuario = localStorage.getItem('usuario');

  React.useEffect(() => {
    api
      .get(`/users/${usuario}`)
      .then((res) => {
        setUser(res.data.user);
        setPokemons(res.data.pokemons);
      })
      .catch((error) => {
        console.error('Erro ao buscar usuário:', error);
      });
  }, [usuario]);

  const handleDelete = (pokemon) => {
    api
      .delete(`/users/${usuario}/starred/${pokemon}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Erro ao remover Pokémon:', error);
      });
  };

  return (
    <>
      <Navbar />

      <div className="box-container-perfil">
        <div className="pokedex">
          <img className="ash" src={Ash} alt="" />

          <h1 className="usuario">{user.username}</h1>

          <h3>
            Pokemons favoritos: {pokemons.length}
          </h3>

          <div className="pokemonsFavoritos">
            {pokemons.map((p) => (
              <div className="favoritos" key={p.id}>
                <img
                  className="pokemonImagem"
                  src={p.image_url}
                  onClick={() => handleDelete(p.name)}
                  alt={p.name}
                />

                <span className="pokemonNome">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}