import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/responseMessage.decorator';

@ApiTags('Book')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('/trash')
  @ApiOperation({ summary: 'Get trash books' })
  getTrash() {
    return this.booksService.getTrash();
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all books' })
  findAllCategories() {
    return this.booksService.getAllBooks();
  }

  @Get('count')
  @ApiOperation({ summary: 'Get count of authors' })
  getCount() {
    return this.booksService.getCount();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ResponseMessage('Create a new book successfully!')
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get books' })
  findAll(@Query('page') page: number = 1, @Query('title') title: string = '') {
    return this.booksService.findAll(page, title);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get book by id' })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update book by id' })
  @ResponseMessage('Update book successfully.')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete book by id' })
  @ResponseMessage('Delete a book successfully')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }

  @Patch('/restore/:id')
  @ApiOperation({ summary: 'Restore book by id' })
  @ResponseMessage('Restore an authors successfully!')
  restore(@Param('id') id: number) {
    return this.booksService.restore(+id);
  }
}
