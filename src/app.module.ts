import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PokemonsModule } from './pokemons/pokemons.module';

import { UserModule } from './user/user.module';
import { TokensModule } from './tokens/tokens.module';
import { FavoritesModule } from './favorites/favorites.module';
import { EmptyModule } from './empty/empty.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    PokemonsModule,
    UserModule,
    TokensModule,
    FavoritesModule,
    EmptyModule
  ]
})
export class AppModule {}
