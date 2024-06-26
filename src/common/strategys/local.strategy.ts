import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { IAdmin } from 'src/common/interfaces/admin.interface';
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

  async validate(emailAdmin: string, password: string): Promise<any> {
    const admin: IAdmin = await this.authService.validateAdmin(
      emailAdmin,
      password,
    );
    if (!admin) {
      throw new UnauthorizedException();
    }

    const { email, id, name, role } = plainToInstance(Admin, admin);

    return {
      id,
      name,
      email,
      role,
    };
  }
}
