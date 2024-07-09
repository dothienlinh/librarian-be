import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/responseMessage.decorator';

@ApiTags('Author')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get('/trash')
  @ApiOperation({ summary: 'Get trash authors' })
  getTrash() {
    return this.authorsService.getTrash();
  }

  @Get('names')
  @ApiOperation({ summary: 'Get category by name' })
  findByName(@Query('name') name: string) {
    return this.authorsService.findByName(name);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all categories' })
  findAllCategories() {
    return this.authorsService.findAllAuthors();
  }

  @Get('count')
  @ApiOperation({ summary: 'Get count of authors' })
  getCount() {
    return this.authorsService.getCount();
  }

  @Get()
  @ApiOperation({ summary: 'Get authors' })
  findAll(@Query('page') page: number = 1, @Query('name') name: string = '') {
    return this.authorsService.findAll(page, name);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get author by id' })
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new author' })
  @ResponseMessage('Create a new author successfully!')
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update author by id' })
  @ResponseMessage('Update an authors successfully!')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  @Patch('/restore/:id')
  @ApiOperation({ summary: 'Restore author by id' })
  @ResponseMessage('Restore an author successfully!')
  restore(@Param('id') id: number) {
    return this.authorsService.restore(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Put in trash' })
  @ResponseMessage('Delete an authors successfully!')
  remove(@Param('id') id: string) {
    return this.authorsService.remove(+id);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete from trash' })
  @ResponseMessage('Delete an author successfully')
  permanentlyDeleted(@Param('id') id: string) {
    return this.authorsService.delete(+id);
  }
}
