import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AdminsService } from 'src/admins/admins.service';
import { IAdmin } from 'src/common/interfaces/admin.interface';
import { IPayload } from 'src/common/interfaces/payload.interface';
import * as ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private adminsService: AdminsService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateAdmin(email: string, pass: string): Promise<any> {
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

  async login(admin: IAdmin, response: Response) {
    const payload: IPayload = {
      email: admin.email,
      name: admin.name,
      role: admin.role,
      id: admin.id,
    };

    const refreshToken = await this.createRefreshToken(payload);

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRES')),
    });

    const [accessToken] = await Promise.all([
      await this.jwtService.signAsync({
        ...payload,
      }),
      await this.adminsService.updateRefreshToken(refreshToken, admin.id),
    ]);
    return {
      admin,
      accessToken,
    };
  }

  refreshToken = async (refreshToken: string) => {
    try {
      await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });

      const admin = await this.adminsService.findByRefreshToken(refreshToken);

      if (!admin) {
        throw new BadRequestException('admin not found');
      }

      const payload: IPayload = {
        email: admin.email,
        name: admin.name,
        role: admin.role,
        id: admin.id,
      };

      return {
        accessToken: await this.jwtService.signAsync({
          ...payload,
        }),
      };
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }
  };

  createRefreshToken = async (payload: IPayload) => {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES'),
    });
  };
}
