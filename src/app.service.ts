import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'VSŠ je najboljša višja šola!';
  }
}
