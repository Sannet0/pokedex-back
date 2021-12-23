import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { Favorites } from '../entitys/favorites.entity';

@Injectable()
export class FavoritesService {
  constructor (@InjectRepository(Favorites) private favoritesRepository: Repository<Favorites>) {}

  async getAllFavoritePokemons(userId: number): Promise<string[]> {
    const favoritePokemonsQuery = await this.favoritesRepository.query(`
      SELECT "pokemonName" FROM Favorites
      WHERE "userId" = ${ userId };
    `);

    const favoritePokemons = [];

    for (const index in favoritePokemonsQuery) {
      favoritePokemons.push(favoritePokemonsQuery[index].pokemonName);
    }

    return favoritePokemons;
  }

  async getFavoritePokemonList(offset: string, limit: string, userId: number): Promise<{ count: number; pokemons: string[] }> {
    const favoritePokemons: string[] = await this.getAllFavoritePokemons(userId);

    const slisedPokemonsList = favoritePokemons.slice(Number.parseInt(offset, 10), Number.parseInt(limit, 10) + Number.parseInt(offset, 10));

    return {
      count: favoritePokemons.length,
      pokemons: slisedPokemonsList
    };
  }

  async addPokemonToFavorite(userId: number, name: string): Promise<[]> {
    return this.favoritesRepository.query(`
      INSERT INTO Favorites ("userId", "pokemonName")
      VALUES (${ userId }, '${ name }')
    `);
  }

  async removePokemonFromFavorite(userId: number, name: string): Promise<DeleteResult> {
    return this.favoritesRepository.query(`
      DELETE FROM Favorites
      WHERE "userId" = ${ userId } AND "pokemonName" = '${ name }'
    `);
  }
}
