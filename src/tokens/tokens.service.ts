import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class TokensService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async refreshTokens(token: string): Promise<{ jwt: string; rt: string }> {
    try {
      const userTokenData: { id: string; login: string } = this.jwtService.verify(token);

      const user = await this.userService.findUserByLogin(userTokenData.login);

      if (user === undefined){
        throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
      }

      const payload = { id: user.id, login: user.login };
      return {
        jwt: this.jwtService.sign(payload),
        rt: this.jwtService.sign(payload, { expiresIn: '24h' })
      };

    } catch (err) {
      throw new HttpException('forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
