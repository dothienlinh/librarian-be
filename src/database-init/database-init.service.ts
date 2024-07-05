import { Injectable, OnModuleInit } from '@nestjs/common';
import { AdminsService } from 'src/admins/admins.service';
import { CreateAdminDto } from 'src/admins/dto/create-admin.dto';
import { AuthorsService } from 'src/authors/authors.service';
import { CreateAuthorDto } from 'src/authors/dto/create-author.dto';
import { BooksService } from 'src/books/books.service';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { CategoriesService } from 'src/categories/categories.service';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';
import { RoleId, RoleName } from 'src/common/enums/rolse';
import { CreateMemberDto } from 'src/members/dto/create-member.dto';
import { MembersService } from 'src/members/members.service';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class DatabaseInitService implements OnModuleInit {
  constructor(
    private readonly adminsService: AdminsService,

    private readonly rolesService: RolesService,

    private readonly membersService: MembersService,

    private readonly authorsService: AuthorsService,

    private readonly categoriesService: CategoriesService,

    private readonly booksService: BooksService,
  ) {}
  async onModuleInit() {
    if (!(await this.isExistAdmin())) {
      await this.ensureRolesExist();
      await this.ensureSuperAdminsExist();
      await this.ensureNormalAdminsExist();
      await this.ensureMemberExist();
      await this.ensureAuthorExist();
      await this.ensureCategoryExist();
      await this.ensureBooksExist();
    }
  }

  async isExistAdmin() {
    const countAdmin = await this.adminsService.countAdmin();

    if (countAdmin) {
      return true;
    }

    return false;
  }

  async ensureRolesExist() {
    const [superAdminRole, normalAdminRole] = await Promise.all([
      this.rolesService.findOne(RoleId.SUPER_ADMIN),
      this.rolesService.findOne(RoleId.NORMAL_ADMIN),
    ]);

    if (!superAdminRole) {
      await this.rolesService.create({ name: RoleName.SUPER_ADMIN });
    }

    if (!normalAdminRole) {
      await this.rolesService.create({ name: RoleName.NORMAL_ADMIN });
    }
  }

  async ensureSuperAdminsExist() {
    const isExist = await this.adminsService.isExistAdmin();

    if (!isExist) {
      const password = '123456';
      const createAdminDto: CreateAdminDto = {
        email: 'admin@gmail.com',
        name: 'Super Admin',
        password: password,
        roleId: RoleId.SUPER_ADMIN,
        confirmPassword: password,
      };
      return await this.adminsService.create(createAdminDto);
    }
  }

  async ensureNormalAdminsExist() {
    const password = '123456';

    const adminDtos: CreateAdminDto[] = [];

    for (let i = 1; i <= 5; i++) {
      const hashedPassword = await this.adminsService.hashPassword(password);
      adminDtos.push({
        email: `admin${i}@example.com`,
        name: `Normal Admin ${i}`,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        roleId: RoleId.NORMAL_ADMIN,
      });
    }

    await this.adminsService.deleteAllNormalAdmin();
    await this.adminsService.createsMultipleAdmin(adminDtos);
  }

  async ensureMemberExist() {
    const members: CreateMemberDto[] = [];

    for (let i = 1; i <= 20; i++) {
      members.push({
        studentId: i,
        name: `Member ${i}`,
        address: `Address ${i}`,
        phone: `0348937335`,
        email: `member${i}@example.com`,
        membershipDate: new Date(Date.now()),
      });
    }

    await this.membersService.deleteAll();
    await this.membersService.createsMultipleMember(members);
  }

  async ensureAuthorExist() {
    const authors: CreateAuthorDto[] = [];

    for (let i = 1; i <= 20; i++) {
      authors.push({
        name: `Author ${i}`,
        birthdate: new Date(Date.now()),
      });
    }

    await this.authorsService.deleteAll();
    await this.authorsService.createsMultipleMember(authors);
  }

  async ensureCategoryExist() {
    const categories: CreateCategoryDto[] = [];

    for (let i = 1; i <= 20; i++) {
      categories.push({
        name: `Category ${i}`,
      });
    }

    await this.categoriesService.deleteAll();
    await this.categoriesService.createsMultipleMember(categories);
  }

  async ensureBooksExist() {
    const books: CreateBookDto[] = [];

    for (let i = 1; i <= 20; i++) {
      books.push({
        title: `Title ${i}`,
        authorId: [i],
        categories: [i],
        copies: 200,
        isbn: `97812345678${i}`,
        publisher: `Publisher ${i}`,
        year: 2020,
      });
    }

    await this.booksService.deleteAll();
    await this.booksService.createsMultipleBook(books);
  }
}
