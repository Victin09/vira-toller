import { Response } from 'express';
import { Controller, Post, UseGuards, Body, Res, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Body() data: SignInDto, @Res() res: Response): Promise<void> {
    const token = await this.authService.signin(data);
    res.cookie('token', token, { httpOnly: true }).json({
      status: 'success',
      message: 'User signed in successfully',
      data: data,
    });
  }

  @Post('signup')
  async signup(@Body() user: SignUpDto, @Res() res: Response): Promise<void> {
    const token = await this.authService.signup(user);
    res.cookie('token', token, { httpOnly: true }).json({
      status: 'success',
      message: 'User created successfully',
      data: user,
    });
  }
}
