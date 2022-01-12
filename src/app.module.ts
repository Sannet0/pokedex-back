import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PokemonsModule } from './pokemons/pokemons.module';

import { UserModule } from './user/user.module';
import { TokensModule } from './tokens/tokens.module';
import { FavoritesModule } from './favorites/favorites.module';
import { User } from './entity/user.entity';
import { Favorites } from './entity/favorites.entity';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'database-1.cdfqr522jpvs.eu-west-2.rds.amazonaws.com',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'postgres',
    //   database: 'postgres',
    //   synchronize: false,
    //   logging: true,
    //   entities: [
    //     User,
    //     Favorites
    //   ],
    //   migrations: [
    //     __dirname + "/src/migration/*.ts"
    //   ],
    //   cli: {
    //     "entitiesDir": __dirname + "/src/entity",
    //     "migrationsDir": __dirname + "/src/migration"
    //   },
    //   autoLoadEntities: true,
    // }),
    TypeOrmModule.forRoot(),
    PokemonsModule,
    UserModule,
    TokensModule,
    FavoritesModule
  ]
})
export class AppModule {}
