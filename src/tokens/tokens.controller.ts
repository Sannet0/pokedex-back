import { Body, Controller, Patch } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('token')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Patch()
  async getAll(@Body() dto: RefreshTokenDto): Promise<{ jwt: string; rt: string }> {
    const { token } = dto;
    return this.tokensService.refreshTokens(token);
  }
}
