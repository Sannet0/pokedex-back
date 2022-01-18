import { Controller, Get } from '@nestjs/common';

@Controller('')
export class EmptyController {
  @Get('')
  async getAllFavoritePokemons(): Promise<string> {
    return 'Hello! This is API fo Pokedex! ' + process.env.JWT_SECRET;
  }
}
