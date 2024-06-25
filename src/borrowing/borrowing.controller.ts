import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import { UpdateBorrowingDto } from './dto/update-borrowing.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/responseMessage.decorator';

@ApiTags('Borrowing')
@Controller('borrowing')
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  @Get('/trash')
  @ApiOperation({ summary: 'Get trash borrow' })
  getTrash() {
    return this.borrowingService.getTrash();
  }

  @Post()
  @ApiOperation({ summary: 'Create new borrow' })
  @ResponseMessage('Create new borrow successfully!')
  create(@Body() createBorrowingDto: CreateBorrowingDto) {
    return this.borrowingService.create(createBorrowingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get borrows' })
  findAll() {
    return this.borrowingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get borrow by id' })
  findOne(@Param('id') id: string) {
    return this.borrowingService.findOne(+id);
  }

  @Patch(':id')
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

  @Patch('/restore/:id')
  @ApiOperation({ summary: 'Restore book by id' })
  @ResponseMessage('Restore an borrow successfully!')
  restore(@Param('id') id: number) {
    return this.borrowingService.restore(+id);
  }
}
