import { Module } from '@nestjs/common';
import { DatabaseInitService } from './database-init.service';
import { DatabaseInitController } from './database-init.controller';
import { AdminsModule } from 'src/admins/admins.module';
import { RolesModule } from 'src/roles/roles.module';
import { MembersModule } from 'src/members/members.module';
import { AuthorsModule } from 'src/authors/authors.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [
    AdminsModule,
    RolesModule,
    MembersModule,
    AuthorsModule,
    CategoriesModule,
    BooksModule,
  ],
  controllers: [DatabaseInitController],
  providers: [DatabaseInitService],
})
export class DatabaseInitModule {}
