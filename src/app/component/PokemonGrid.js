"use client";
import Link from "next/link";

export default function PokemonGrid({ pokemonList }) {
  console.log(pokemonList, "pokemonList");
  if (pokemonList.length === 0) {
    return <p>No Pokémon found matching your criteria.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 ">
      {pokemonList.map((pokemon) => (
        <Link
          key={pokemon.id}
          href={`/${pokemon.name}`}
          className="border border-gray-300 rounded-lg overflow-hidden bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
        >
          <div className="w-full aspect-square flex items-center justify-center bg-gray-100">
            <img
              src={
                pokemon.sprites.other["official-artwork"].front_default ||
                pokemon.sprites.front_default
              }
              alt={pokemon.name}
              className="w-4/5 h-4/5 object-contain"
            />
          </div>

          <div className="p-2 text-center">
            <h3 className="my-2 text-gray-800 font-semibold capitalize">
              {pokemon.name}
            </h3>

            <div
              className="flex justify-center gap-2 mb-2 flex-wrap"
              style={{ padding: "10px" }}
            >
              {pokemon.types.map((type, index) => (
                <span
                  key={index}
                  className={`text-lg rounded  font-medium text-white bg-[#f08030] `}
                  style={{ padding: "6px" }}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
