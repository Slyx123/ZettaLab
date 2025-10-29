import React, { useEffect, useState } from "react";
import axios from "axios";

interface Pokemon {
  name: string;
  sprites: {
    front_default: string | null;
    other?: {
      "official-artwork"?: {
        front_default: string | null;
      };
    };
  };
  types: { type: { name: string } }[];
}

const PokemonSection: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPokemon = async () => {
    setLoading(true);
    try {
      const id = Math.floor(Math.random() * 898) + 1;
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setPokemon(res.data);
    } catch {
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const getPokemonImage = () =>
    pokemon?.sprites.other?.["official-artwork"]?.front_default ||
    pokemon?.sprites.front_default ||
    "";

  return (
    <div className="container py-5 text-center">
      <h2 className="mb-4">Descubra seu Pokémon!</h2>
      {loading ? (
        <p>Carregando Pokémon...</p>
      ) : pokemon ? (
        <div className="card mx-auto pokemon-card">
          <img
            src={getPokemonImage()}
            alt={pokemon.name}
            className="card-img-top pokemon-img"
          />
          <div className="card-body">
            <h5 className="card-title text-capitalize">{pokemon.name}</h5>
            <p className="card-text">
              Tipo(s): {pokemon.types.map((t) => t.type.name).join(", ")}
            </p>
            <button className="btn btn-primary mt-3" onClick={fetchPokemon}>
              Próximo Pokémon
            </button>
          </div>
        </div>
      ) : (
        <p>Erro ao carregar Pokémon.</p>
      )}
    </div>
  );
};

export default PokemonSection;
