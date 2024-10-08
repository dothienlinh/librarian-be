import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/responseMessage.decorator';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/trash')
  @ApiOperation({ summary: 'Get trash category' })
  getTrash() {
    return this.categoriesService.getTrash();
  }

  @Get('names')
  @ApiOperation({ summary: 'Get category by name' })
  findByName(@Query('name') name: string) {
    return this.categoriesService.findByName(name);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all categories' })
  findAllCategories() {
    return this.categoriesService.findAllCategories();
  }

  @Get('count')
  @ApiOperation({ summary: 'Get count of authors' })
  getCount() {
    return this.categoriesService.getCount();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ResponseMessage('Create a new category successfully!')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all category' })
  findAll(@Query('page') page: number = 1, @Query('name') name: string = '') {
    return this.categoriesService.findAll(page, name);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by id' })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update category by id' })
  @ResponseMessage('Update an category successfully')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete from trash' })
  @ResponseMessage('Delete an category successfully')
  permanentlyDeleted(@Param('id') id: string) {
    return this.categoriesService.delete(+id);
  }

  @Delete(':id')
  @ResponseMessage('Delete an category successfully')
  @ApiOperation({ summary: 'Put in trash' })
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }

  @Patch('/restore/:id')
  @ApiOperation({ summary: 'Restore category by id' })
  @ResponseMessage('Restore an category successfully!')
  restore(@Param('id') id: number) {
    return this.categoriesService.restore(+id);
  }
}
