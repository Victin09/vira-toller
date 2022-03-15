import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signin(user: any): Promise<string> {
    const payload = { email: user.email };
    return this.jwtService.sign(payload);
  }

  async signup(data: SignUpDto): Promise<string> {
    const userExist = await this.userService.findByEmail(data.email);
    if (userExist) {
      throw new HttpException('Error: user already exist', 409);
    }
    const user = await this.userService.create(data);
    const payload = { email: user.email };
    return this.jwtService.sign(payload);
  }
}
