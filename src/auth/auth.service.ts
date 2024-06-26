import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminsService } from 'src/admins/admins.service';
import { IUser } from 'src/common/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private adminsService: AdminsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const author = await this.adminsService.findByEmail(email);

    if (author) {
      const verifyPassword = await this.adminsService.verifyHashPassword(
        pass,
        author.password,
      );

      if (verifyPassword) {
        return author;
      }
    }

    throw new BadRequestException('Email or password is incorrect');
  }

  async login(user: IUser) {
    return {
      accessToken: this.jwtService.sign(user),
    };
  }
}
