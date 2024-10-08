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
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/responseMessage.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('Admin')
@Roles()
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

  @Put(':id')
  @ResponseMessage('Update an admin successfully')
  @ApiOperation({ summary: 'Update admin by id' })
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Put in trash' })
  @ResponseMessage('Delete an admin successfully')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(+id);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete from trash' })
  @ResponseMessage('Delete an admin successfully')
  permanentlyDeleted(@Param('id') id: string) {
    return this.adminsService.delete(+id);
  }

  @Patch('/restore/:id')
  @ApiOperation({ summary: 'Restore admin by id' })
  @ResponseMessage('Restore an admin successfully!')
  restore(@Param('id') id: number) {
    return this.adminsService.restore(+id);
  }
}
