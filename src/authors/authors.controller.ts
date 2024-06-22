import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Author')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get('/trash')
  @ApiOperation({ summary: 'Get trash authors' })
  getTrash() {
    return this.authorsService.getTrash();
  }

  @Get()
  @ApiOperation({ summary: 'Get authors' })
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get author by id' })
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new author' })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update author by id' })
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  @Patch('/restore/:id')
  @ApiOperation({ summary: 'Restore author by id' })
  restore(@Param('id') id: number) {
    return this.authorsService.restore(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete author by id' })
  remove(@Param('id') id: string) {
    return this.authorsService.remove(+id);
  }
}
