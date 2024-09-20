import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  serverStats(): string {
    return 'ENNOV Backend is running !!!';
  }
}
