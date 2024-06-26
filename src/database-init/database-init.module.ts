import { Module } from '@nestjs/common';
import { DatabaseInitService } from './database-init.service';
import { DatabaseInitController } from './database-init.controller';
import { AdminsModule } from 'src/admins/admins.module';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [AdminsModule, RolesModule],
  controllers: [DatabaseInitController],
  providers: [DatabaseInitService],
})
export class DatabaseInitModule {}
