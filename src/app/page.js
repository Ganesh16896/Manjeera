"use client";
import React, { useEffect, useState } from "react";

import PokemonGrid from "./component/PokemonGrid";
import axios from "axios";

const page = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(filteredPokemon, "filteredPokemon");

  const fetchPokemon = async () => {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );

      const pokemonWithDetails = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return res.data;
        })
      );
      setPokemonList(pokemonWithDetails);
      setFilteredPokemon(pokemonWithDetails);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      setLoading(false);
    }
  };

  const fetchTypes = async () => {
    try {
      const data = await axios.get("https://pokeapi.co/api/v2/type/");
      console.log(data);
      setTypes(data?.data?.results);
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };

  useEffect(() => {
    fetchPokemon();
    fetchTypes();
  }, []);

  useEffect(() => {
    let filtered = [...pokemonList];

    if (selectedType) {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some((type) => type.type.name === selectedType)
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPokemon(filtered);
  }, [selectedType, searchTerm, pokemonList]);

  return (
    <div
      style={{ paddingLeft: "20px", paddingRight: "20px" }}
      className="p-4 max-w-full mx-auto"
    >
      <p
        style={{ padding: "20px", paddingBottom: "20px" }}
        className="text-center my-4 mb-8 text-gray-800 text-2xl font-bold"
      >
        Pokemon character
      </p>

      <div
        style={{ marginBottom: "2rem" }}
        className="flex flex-col gap-4 mb-8 md:flex-row md:justify-center"
      >
        <select
          style={{
            padding: "8px",
          }}
          className=" border w-[150px] border-[#ccc] rounded text-base"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">All Types</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          style={{
            padding: "8px",
          }}
          className=" border border-[#ccc] rounded-md text-base w-full md:flex-grow"
          placeholder="Search Pokemon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <PokemonGrid pokemonList={filteredPokemon} />
      )}
    </div>
  );
};

export default page;
