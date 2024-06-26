import { Controller } from '@nestjs/common';
import { DatabaseInitService } from './database-init.service';

@Controller('database-init')
export class DatabaseInitController {
  constructor(private readonly databaseInitService: DatabaseInitService) {}
}
