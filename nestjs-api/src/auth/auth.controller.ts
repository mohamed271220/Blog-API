import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  AuthCredentialsDtoLogin,
  AuthCredentialsDtoSignUp,
} from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard'; // Ensure you have a JWT guard
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDtoSignUp): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/login')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDtoLogin,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('User', 'Admin') // Example roles
  @Get('/logout')
  logOut(): Promise<void> {
    return this.authService.logOut();
  }
}
