import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { Public } from 'src/common/decorators/isPublic';
import { ResponseMessage } from 'src/common/decorators/responseMessage.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginAuthDto })
  @Public()
  @ApiOperation({ summary: 'Login' })
  @ApiBearerAuth('accessToken')
  @ResponseMessage('Login successful!')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Get('account')
  @ApiOperation({ summary: 'Get current admin' })
  getProfile(@Req() req) {
    return req.user;
  }
}
