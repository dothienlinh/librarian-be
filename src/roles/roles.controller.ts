import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/responseMessage.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('Role')
@Controller('roles')
@Roles()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get('/trash')
  @ApiOperation({ summary: 'Get trash roles' })
  getTrash() {
    return this.rolesService.getTrash();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  @ResponseMessage('Create a new role successfully!')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get roles' })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get role by id' })
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update role by id' })
  @ResponseMessage('Update an role successfully')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete from trash' })
  @ResponseMessage('Delete an role successfully')
  permanentlyDeleted(@Param('id') id: string) {
    return this.rolesService.delete(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Put in trash' })
  @ResponseMessage('Delete an role successfully')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }

  @Patch('/restore/:id')
  @ApiOperation({ summary: 'Restore author by id' })
  @ResponseMessage('Restore an role successfully!')
  restore(@Param('id') id: number) {
    return this.rolesService.restore(+id);
  }
}
