"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function PokemonDetail() {
  const params = useParams();
  const router = useRouter();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${params.pokemon}`
        );

        console.log(response);

        setPokemon(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [params.pokemon]);

  if (loading) return <p>Loading...</p>;
  if (!pokemon) return <p>Pokémon not found</p>;

  return (
    <div
      className="w-full "
      style={{ paddingRight: "20px", paddingLeft: "20px", marginTop: "30px" }}
    >
      <button
        onClick={() => router.back()}
        className=" bg-600 text-black rounded cursor-pointer border bg-[#ccc] "
        style={{ padding: "5px 5px", marginBottom: "10px" }}
      >
        Back Page
      </button>
      <div className="flex flex-col md:flex-row flex-wrap gap-11">
        <div className="flex-1 flex justify-center items-center bg-gray-100 rounded-lg p-4">
          <img
            src={
              pokemon.sprites.other["official-artwork"].front_default ||
              pokemon.sprites.front_default
            }
            alt={pokemon.name}
            // className={styles.image}
            className="max-w-full h-auto"
          />
        </div>

        <div className="flex-1 p-4">
          <h1 className="text-2xl">{pokemon.name}</h1>

          <div className="flex gap-4" style={{ paddingTop: "10px" }}>
            {pokemon.types.map((type, index) => (
              <span
                key={index}
                className="bg-[#f08030] rounded-xl "
                style={{ padding: "0.5rem 1rem" }}
              >
                {type.type.name}
              </span>
            ))}
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <p style={{ marginBottom: "0.5rem" }} className="text-[#333]">
              Stats
            </p>
            <ul>
              {pokemon.stats.map((stat, index) => (
                <li
                  key={index}
                  style={{ marginBottom: "0.5rem", padding: "0.5rem" }}
                  className="bg-[#f5f5f5]  rounded-md"
                >
                  <span className="font-bold">{stat.stat.name} : </span>
                  <span>{stat.base_stat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ paddingTop: "1.5rem" }}>
            <p style={{ marginBottom: "0.5rem" }} className="text-[#333]">
              Abilities
            </p>
            <ul>
              {pokemon.abilities.map((ability, index) => (
                <li
                  key={index}
                  style={{ marginBottom: "0.5rem", padding: "0.5rem" }}
                  className="bg-[#f5f5f5] font-bold rounded-md"
                >
                  {ability.ability.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
