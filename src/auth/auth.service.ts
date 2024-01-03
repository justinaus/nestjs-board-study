import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth.credential.dto';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    // @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(dto: AuthCredentialDto) {
    return this.userRepository.createUser(dto);
  }

  async signIn(dto: AuthCredentialDto) {
    const { username, password } = dto;
    const user = await this.userRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'login success';
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
