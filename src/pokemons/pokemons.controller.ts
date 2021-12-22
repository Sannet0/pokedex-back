import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { JwtService } from '@nestjs/jwt';
import { ListDto } from './dto/list.dto';
import { FiltredByNameDto } from './dto/filtred-by-name.dto';
import { FiltredByNameAndTypeDto } from './dto/filtred-by-name-and-type.dto';
import { Observable } from 'rxjs';

@Controller('pokemons')
export class PokemonsController {
  constructor (private pokemonService: PokemonsService, private jwtService: JwtService) {
  }

  @Get('')
  getAllPokemons(@Query() dto: ListDto): Observable<{ count: number; pokemons: string[] }> {
    return this.pokemonService.getAllPokemons(dto.offset, dto.limit, '');
  }

  @Get('/search/:name')
  getAllPokemonsByName(@Query() dto: ListDto, @Param() filtersDto: FiltredByNameDto): Observable<{ count: number; pokemons: string[] }> {
    return this.pokemonService.getAllPokemons(dto.offset, dto.limit, filtersDto.name);
  }

  @Get('/filtred/:types')
  async getAllPokemonsByTypes(@Query() dto: ListDto, @Param() filtersDto: FiltredByNameAndTypeDto): Promise<{ count: number; pokemons: string[] }> {
    const types = filtersDto.types.split(',');
    return this.pokemonService.getAllPokemonsByFilter(dto.offset, dto.limit, types, '');
  }

  @Get('/filtred/:types/:name')
  async getAllPokemonsByTypesAndName(@Query() dto: ListDto, @Param() filtersDto: FiltredByNameAndTypeDto): Promise<{ count: number; pokemons: string[] }> {
    const types = filtersDto.types.split(',');
    return this.pokemonService.getAllPokemonsByFilter(dto.offset, dto.limit, types, filtersDto.name);
  }

  @Get('/:name')
  async getPokemonByName(@Param() dto: FiltredByNameDto, @Req() req: any): Promise<Observable<{ img: string; stats: any[]; types: any[]; isFavorite: boolean }>> {
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
