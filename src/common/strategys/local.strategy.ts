import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { IUser } from 'src/common/interfaces/user.interface';
import { Admin } from 'src/admins/entities/admin.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user: IUser = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    const { email, id, name, role } = plainToInstance(Admin, user);

    return {
      id,
      name,
      email,
      role,
    };
  }
}
