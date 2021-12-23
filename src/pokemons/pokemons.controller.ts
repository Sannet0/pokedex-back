import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

import { PokemonsService } from './pokemons.service';
import { ListDto } from './dto/list.dto';
import { FiltredByNameDto } from './dto/filtred-by-name.dto';
import { FiltredByNameAndTypeDto } from './dto/filtred-by-name-and-type.dto';
import { IPokemonResponse } from '../interfaces/pokemon-responce-inteface';
import { IPokemon } from '../interfaces/pokemon-interface';

@Controller('pokemons')
export class PokemonsController {
  constructor (private pokemonService: PokemonsService, private jwtService: JwtService) {
  }

  @Get('')
  getAllPokemons(@Query() dto: ListDto): Promise<Observable<IPokemonResponse>> {
    return this.pokemonService.getAllPokemons(dto.offset, dto.limit, '');
  }

  @Get('/search/:name')
  getAllPokemonsByName(@Query() dto: ListDto, @Param() filtersDto: FiltredByNameDto): Promise<Observable<IPokemonResponse>> {
    return this.pokemonService.getAllPokemons(dto.offset, dto.limit, filtersDto.name);
  }

  @Get('/filtred/:types')
  async getAllPokemonsByTypes(@Query() dto: ListDto, @Param() filtersDto: FiltredByNameAndTypeDto): Promise<IPokemonResponse> {
    const types = filtersDto.types.split(',');
    return this.pokemonService.getAllPokemonsByFilter(dto.offset, dto.limit, types, '');
  }

  @Get('/filtred/:types/:name')
  async getAllPokemonsByTypesAndName(@Query() dto: ListDto, @Param() filtersDto: FiltredByNameAndTypeDto): Promise<IPokemonResponse> {
    const types = filtersDto.types.split(',');
    return this.pokemonService.getAllPokemonsByFilter(dto.offset, dto.limit, types, filtersDto.name);
  }

  @Get('/:name')
  async getPokemonByName(@Param() dto: FiltredByNameDto, @Req() req: any): Promise<Observable<IPokemon>> {
    try {
      const authHeader: string[] = req.headers.authorization.split(' ');
      const token: string = authHeader[1];
      const isJWTVerify = this.jwtService.verify(token);

      const userId: number = isJWTVerify.id;

      return this.pokemonService.getPokemonByName(dto.name, userId);
    } catch (err) {
      return this.pokemonService.getPokemonByName(dto.name, 0);
    }
  }
}
