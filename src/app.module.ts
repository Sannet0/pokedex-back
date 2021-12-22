import { Module } from '@nestjs/common';
import { PokemonsModule } from './pokemons/pokemons.module';
import { User } from './entitys/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from './entitys/favorites.entity';
import { UserModule } from './user/user.module';
import { TokensModule } from './tokens/tokens.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [User, Favorites],
      synchronize: true,
      autoLoadEntities: true,
    }),
    PokemonsModule,
    UserModule,
    TokensModule,
    FavoritesModule
  ]
})
export class AppModule {}
