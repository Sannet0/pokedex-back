import { Body, Controller, Get, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../guards/jwt.guard';
import { FavoritesService } from './favorites.service';
import { DeleteResult } from 'typeorm';
import { ListDto } from '../pokemons/dto/list.dto';
import { PokemonStatusDto } from './dto/pokemon-status.dto';

@UseGuards(JwtGuard)
@Controller('favorites')
export class FavoritesController {
  constructor (private favoritesService: FavoritesService) {
  }

  @Get('')
  async getAllFavoritePokemons(@Req() req: any, @Query() dto: ListDto): Promise<{ count: number; pokemons: string[] }> {
    return this.favoritesService.getFavoritePokemonList(dto.offset, dto.limit, req.user.id);
  }

  @Patch('')
  async setPokemonStatus(@Body() dto: PokemonStatusDto, @Req() req: any): Promise<DeleteResult | []> {
    const {name, isFavorite} = dto;
    if (isFavorite){
      return this.favoritesService.addPokemonToFavorite(req.user.id, name);
    }
    return this.favoritesService.removePokemonFromFavorite(req.user.id, name);
  }
}
