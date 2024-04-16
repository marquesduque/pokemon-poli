// src/hooks/usePokemons.ts
import { useQuery, useQueries } from '@tanstack/react-query';
import { api } from '../api/pokemonApi';

interface Pokemon {
  name: string;
  url: string;
  abilities?: Ability[];
}

interface Ability {
  ability: {
    name: string;
    url: string;
  };
}

interface PokemonAbilityResponse {
  abilities: Ability[];
}

interface PokemonListResponse {
  results: Pokemon[];
}

export const usePokemons = () => {
  const fetchPokemon = async (url: string) => {
    const { data } = await api.get<PokemonAbilityResponse>(url);
    return {
      ...data,
      abilities: data.abilities
    };
  };

  const pokemonQuery = useQuery({
    queryKey: ['pokemons'],
    queryFn: async () => {
      const { data } = await api.get<PokemonListResponse>('pokemon?offset=0&limit=100');
      const pokemonWithAbilities = await Promise.all(
        data.results.map(async (pokemon) => {
          const pokemonDetails = await fetchPokemon(pokemon.url.replace('https://pokeapi.co/api/v2/', ''));
          return {
            ...pokemon,
            name: pokemon.name.replace(/-/g, ' '),
            abilities: pokemonDetails.abilities
          };
        })
      );
      return pokemonWithAbilities;
    }
  });

  return pokemonQuery;
};
