import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PokemonsModule } from './pokemons/pokemons.module';

import { UserModule } from './user/user.module';
import { TokensModule } from './tokens/tokens.module';
import { FavoritesModule } from './favorites/favorites.module';
import { EmptyModule } from './empty/empty.module';
import { BucketModule } from './bucket/bucket.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    DatabaseModule,
    PokemonsModule,
    UserModule,
    TokensModule,
    FavoritesModule,
    EmptyModule,
    BucketModule
  ]
})
export class AppModule {}
