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
import { BorrowingService } from './borrowing.service';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import { UpdateBorrowingDto } from './dto/update-borrowing.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/responseMessage.decorator';
import { StatusBorrowing } from 'src/common/enums/statusBorrowing';

@ApiTags('Borrowing')
@Controller('borrowing')
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  @Post()
  @ApiOperation({ summary: 'Create new borrow' })
  @ResponseMessage('Create new borrow successfully!')
  create(@Body() createBorrowingDto: CreateBorrowingDto) {
    return this.borrowingService.create(createBorrowingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get borrows' })
  @ApiQuery({
    name: 'memberName',
    required: false,
  })
  @ApiQuery({
    name: 'bookName',
    required: false,
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: StatusBorrowing,
  })
  findAll(
    @Query('page') page: number = 1,
    @Query('memberName') memberName: string = '',
    @Query('bookName') bookName: string = '',
    @Query('status') status: StatusBorrowing,
  ) {
    return this.borrowingService.findAll(page, memberName, bookName, status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get borrow by id' })
  findOne(@Param('id') id: string) {
    return this.borrowingService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update borrow by id' })
  @ResponseMessage('Update an borrow successfully')
  update(
    @Param('id') id: string,
    @Body() updateBorrowingDto: UpdateBorrowingDto,
  ) {
    return this.borrowingService.update(+id, updateBorrowingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete borrow by id' })
  @ResponseMessage('Delete an borrow successfully')
  remove(@Param('id') id: string) {
    return this.borrowingService.remove(+id);
  }

  @Patch('/give-book-back/:id')
  @ApiOperation({ summary: 'Return books by id' })
  @ResponseMessage('The book has been returned!')
  bookRolls(@Param('id') id: number) {
    return this.borrowingService.giveBookBack(+id);
  }
}
