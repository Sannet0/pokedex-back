import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: '' + process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '24h'
      }
    }),
    UserModule
  ],
  providers: [TokensService],
  controllers: [TokensController]
})
export class TokensModule {}
