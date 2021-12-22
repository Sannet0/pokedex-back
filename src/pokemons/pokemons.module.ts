import { Module } from '@nestjs/common';
import { PokemonsController } from './pokemons.controller';
import { PokemonsService } from './pokemons.service';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [
    HttpModule,
    FavoritesModule,
    JwtModule.register({
      secret: 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  controllers: [PokemonsController],
  providers: [PokemonsService]
})
export class PokemonsModule {}
