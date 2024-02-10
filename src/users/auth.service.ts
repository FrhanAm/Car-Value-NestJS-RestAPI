import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scryptSync } from 'crypto';
// import { randomBytes, scrypt as _scrypt } from "crypto";
// import { promisify } from "util";

// const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    // generate salt
    const salt = randomBytes(8).toString('hex');

    // hash salt and password
    // const hash = await scrypt(password, salt, 32) as Buffer;
    const hash = await scryptSync(password, salt, 32);

    // join hashed result and salt together
    const result = salt + '.' + hash.toString('hex');

    // create a new user
    const user = await this.usersService.create(email, result);

    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = await scryptSync(password, salt, 32);

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }

    return user;
  }
}
