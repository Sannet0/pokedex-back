import { Controller, Get } from '@nestjs/common';

@Controller('')
export class FavoritesController {
  @Get('')
  async getAllFavoritePokemons(): Promise<string> {
    return 'Hello! This is API fo Pokedex!';
  }
}
