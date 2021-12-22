import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class PokemonsService {

  constructor(private httpService: HttpService, private favoritesService: FavoritesService) {
  }

  baseURL = 'https://pokeapi.co/api/v2/';

  getAllPokemons(offset: string, limit: string, name: string): Observable<{ count: number; pokemons: string[] }> {
    let selfOffset = offset;
    let selflimit = limit;
    if (name) {
      selfOffset = '0';
      selflimit = '1118';
    }

    return this.httpService.get(this.baseURL + 'pokemon?offset=' + selfOffset + '&limit=' + selflimit).pipe(
      map(response => {
        let pokemons = [];
        let count = 0;
        const findPokemons = [];
        for (const index in response.data.results) {
          if (name) {
            if (response.data.results[index].name.search(name) !== -1) {
              findPokemons.push(response.data.results[index].name);
            }
          } else {
            pokemons.push(response.data.results[index].name);
          }
        }
        count = response.data.count;
        if (name) {
          pokemons = findPokemons.slice(Number.parseInt(offset, 10), Number.parseInt(limit, 10) + Number.parseInt(offset, 10));
          count = findPokemons.length + 1;
        }

        return {
          count,
          pokemons
        };
      })
    );
  }

  async getAllPokemonsByFilter(offset: string, limit: string, types: string[], name: string): Promise<{ count: number; pokemons: string[] }> {
    const correctTypes = ['normal', 'poison', 'psychic', 'grass', 'ground', 'ice', 'fire', 'rock', 'dragon', 'water', 'bug', 'dark', 'fighting', 'ghost', 'steel', 'flying', 'electric', 'fairy'];
    const pokemonsByAllTypes = [];
    const uniqTypes = [...new Set(types)];

    for (const index in uniqTypes) {
      const type = uniqTypes[index].toLowerCase();
      if (correctTypes.includes(type)) {
        const responce = await this.httpService.get(this.baseURL + 'type/' + type).toPromise();
        for (const index in responce.data.pokemon) {
          if (name) {
            if (responce.data.pokemon[index].pokemon.name.search(name) !== -1) {
              pokemonsByAllTypes.push(responce.data.pokemon[index].pokemon.name);
            }
          } else {
            pokemonsByAllTypes.push(responce.data.pokemon[index].pokemon.name);
          }
        }
      }
    }

    const unUniqPokemonsByType = pokemonsByAllTypes.filter((e, i, a) => a.indexOf(e) !== i);
    const slisedPOkemonsList = unUniqPokemonsByType.slice(Number.parseInt(offset, 10), Number.parseInt(limit, 10) + Number.parseInt(offset, 10));

    return {
      count: unUniqPokemonsByType.length + 1,
      pokemons: slisedPOkemonsList
    };
  }

  async getPokemonByName(name: string, userId: number): Promise<Observable<{ img: string; stats: any[]; types: any[]; isFavorite: boolean }>> {
    const favoritePokemons: string[] = await this.favoritesService.getAllFavoritePokemons(userId);

    return this.httpService.get(this.baseURL + 'pokemon/' + name).pipe(
      map(response => {
        const stats = [];
        const types = [];
        let isFavorite = false;

        for (const index in response.data.stats) {
          stats.push({
            name: response.data.stats[index].stat.name,
            point: response.data.stats[index].base_stat
          });
        }

        for (const index in response.data.types) {
          types.push(response.data.types[index].type.name);
        }

        if (favoritePokemons.includes(name)) {
          isFavorite = true;
        }

        return {
          img: response.data.sprites.front_default,
          stats,
          types,
          isFavorite
        };
      })
    );
  }

}
