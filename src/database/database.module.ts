import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

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
    })
  ]
})
export class DatabaseModule {}
