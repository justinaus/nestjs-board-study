import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth.credential.dto';

@Injectable()
export class AuthService {
  constructor(
    // @InjectRepository(BoardRepository)
    private userRepository: UserRepository,
  ) {}
  async signUp(dto: AuthCredentialDto) {
    return this.userRepository.createUser(dto);
  }
}
