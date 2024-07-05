import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Like, Not, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoriesRepository.create(createCategoryDto);

    return plainToInstance(
      Category,
      await this.categoriesRepository.save(category),
    );
  }

  async findAll(page: number, name: string) {
    const [categories, total] = await this.categoriesRepository.findAndCount({
      where: { name: Like(`%${name}%`) },
      take: 10,
      skip: (page - 1) * 10,
    });

    return {
      categories: plainToInstance(Category, categories),
      total,
    };
  }

  async findOne(id: number) {
    return plainToInstance(
      Category,
      await this.categoriesRepository.findOneBy({ id }),
    );
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoriesRepository.update({ id }, updateCategoryDto);
  }

  async remove(id: number) {
    return await this.categoriesRepository.softDelete(id);
  }

  getTrash = async () => {
    return plainToInstance(
      Category,
      await this.categoriesRepository.find({
        withDeleted: true,
        where: { deletedAt: Not(IsNull()) },
      }),
    );
  };

  restore = async (id: number) => {
    return await this.categoriesRepository.restore(id);
  };

  findByName = async (name: string) => {
    const categories = await this.categoriesRepository.find({
      where: { name: Like(`%${name}%`) },
    });

    return plainToInstance(Category, categories);
  };

  findAllCategories = async () => {
    return plainToInstance(Category, await this.categoriesRepository.find());
  };

  deleteAll = async () => {
    return await this.categoriesRepository
      .createQueryBuilder()
      .delete()
      .from(Category)
      .execute();
  };

  createsMultipleMember = async (createCategoryDto: CreateCategoryDto[]) => {
    return await this.categoriesRepository
      .createQueryBuilder()
      .insert()
      .into(Category)
      .values(createCategoryDto)
      .execute();
  };

  getCount = async () => {
    return {
      count: await this.categoriesRepository.count(),
    };
  };
}
