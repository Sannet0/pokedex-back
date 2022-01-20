import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

import { PokemonsController } from './pokemons.controller';
import { PokemonsService } from './pokemons.service';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [
    HttpModule,
    FavoritesModule,
    JwtModule.register({
      secret: '' + process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  controllers: [PokemonsController],
  providers: [PokemonsService]
})
export class PokemonsModule {}
