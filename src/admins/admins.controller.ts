import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/decorators/responseMessage.decorator';

@ApiTags('Admin')
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get('/trash')
  @ApiOperation({ summary: 'Get trash admins' })
  getTrash() {
    return this.adminsService.getTrash();
  }

  @Post()
  @ResponseMessage('Create a new admin successfully!')
  @ApiOperation({ summary: 'Create a new admin' })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all admin' })
  findAll() {
    return this.adminsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find admin by id' })
  findOne(@Param('id') id: string) {
    return this.adminsService.findOne(+id);
  }

  @Patch(':id')
  @ResponseMessage('Update an admin successfully')
  @ApiOperation({ summary: 'Update admin by id' })
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete admin by id' })
  @ResponseMessage('Delete an admin successfully')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(+id);
  }

  @Patch('/restore/:id')
  @ApiOperation({ summary: 'Restore admin by id' })
  @ResponseMessage('Restore an admin successfully!')
  restore(@Param('id') id: number) {
    return this.adminsService.restore(+id);
  }
}
