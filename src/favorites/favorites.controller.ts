import { Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { JwtGuard } from '../guards/jwt.guard';
import { FavoritesService } from './favorites.service';
import { ListDto } from '../pokemons/dto/list.dto';
import { FiltredByNameDto } from '../pokemons/dto/filtred-by-name.dto';
import { IPokemonResponse } from '../interfaces/pokemon-responce-inteface';

@UseGuards(JwtGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {
  }

  @Get('')
  async getAllFavoritePokemons(@Req() req: any, @Query() dto: ListDto): Promise<IPokemonResponse> {
    return this.favoritesService.getFavoritePokemonList(dto.offset, dto.limit, req.user.id);
  }

  @Post(':name')
  async addPokemonToFavorite(@Param() dto: FiltredByNameDto, @Req() req: any): Promise<[]> {
    return this.favoritesService.addPokemonToFavorite(req.user.id, dto.name);
  }

  @Delete(':name')
  async removePokemonFromFavorite(@Param() dto: FiltredByNameDto, @Req() req: any): Promise<DeleteResult> {
    return this.favoritesService.removePokemonFromFavorite(req.user.id, dto.name);
  }
}
