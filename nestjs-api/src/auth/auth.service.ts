import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user/entities/user.entity';
import { Role } from '../role/role.entity';
import { UserRole } from '../user/entities/user-role.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import {
  AuthCredentialsDtoLogin,
  AuthCredentialsDtoSignUp,
} from './dto/auth-credentials.dto';
import { JwtPayload } from './interfaces';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User)
    private userModel: typeof User,

    @InjectModel(Role)
    private roleModel: typeof Role,

    @InjectModel(UserRole)
    private userRoleModel: typeof UserRole,

    private readonly jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDtoSignUp): Promise<void> {
    const { username, password, email } = authCredentialsDto;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ where: { username } });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await this.userModel.create({
        id: uuid(),
        username,
        password: hashedPassword, // Store hashed password
        email,
      });

      // Assign default role 'User'
      const userRole = await this.roleModel.findOne({
        where: { name: 'User' },
      });
      if (userRole) {
        await this.userRoleModel.create({
          userId: user.id,
          roleId: userRole.id,
        });
      } else {
        this.logger.warn('Default role "User" not found');
      }
    } catch (error) {
      this.logger.error('Failed to create user', error.stack);
      throw new InternalServerErrorException();
    }
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDtoLogin,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.userModel.findOne({
      where: { username },
      include: [{ model: Role, through: { attributes: [] } }],
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const roles = user.roles.map((role) => role.name);
      const payload: JwtPayload = { username, roles };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async logOut(): Promise<void> {
    // No implementation needed for stateless JWT
  }
}
