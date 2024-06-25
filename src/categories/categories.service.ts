import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
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

  async findAll() {
    return plainToInstance(Category, await this.categoriesRepository.find());
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
    return await this.categoriesRepository.find({
      withDeleted: true,
      where: { deletedAt: Not(IsNull()) },
    });
  };

  restore = async (id: number) => {
    return await this.categoriesRepository.restore(id);
  };
}
