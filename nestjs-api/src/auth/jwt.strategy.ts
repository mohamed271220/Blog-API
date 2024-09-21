import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './interfaces';
import { User } from '../user/user.entity';
import { Role } from '../role/role.entity';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET') || 'defaultSecret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user = await this.userModel.findOne({
      where: { username },
      include: [{ model: Role, through: { attributes: [] } }],
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user; // This will attach the user to the request object
  }
}
