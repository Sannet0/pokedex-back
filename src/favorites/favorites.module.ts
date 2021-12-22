import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from '../entitys/favorites.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorites]),
    JwtModule.register({
      secret: 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  providers: [FavoritesService],
  controllers: [FavoritesController],
  exports: [FavoritesService]
})
export class FavoritesModule {}
