import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PokemonsModule } from './pokemons/pokemons.module';

import { UserModule } from './user/user.module';
import { TokensModule } from './tokens/tokens.module';
import { FavoritesModule } from './favorites/favorites.module';
import { EmptyModule } from './empty/empty.module';
import { BucketModule } from './bucket/bucket.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      synchronize: true,
      logging: false,
      entities: [
        "dist/**/*.entity{.ts,.js}"
      ],
      autoLoadEntities: true
    }),
    PokemonsModule,
    UserModule,
    TokensModule,
    FavoritesModule,
    EmptyModule,
    BucketModule
  ]
})
export class AppModule {}
