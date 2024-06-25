import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/responseMessage.decorator';

@ApiTags('Member')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get('/trash')
  @ApiOperation({ summary: 'Get trash members' })
  getTrash() {
    return this.membersService.getTrash();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new member' })
  @ResponseMessage('Create a new member successfully!')
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get members' })
  findAll() {
    return this.membersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get member by id' })
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update member by id' })
  @ResponseMessage('Update an member successfully')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete member by id' })
  @ResponseMessage('Delete an member successfully')
  remove(@Param('id') id: string) {
    return this.membersService.remove(+id);
  }

  @Patch('/restore/:id')
  @ApiOperation({ summary: 'Restore member by id' })
  @ResponseMessage('Restore an member successfully!')
  restore(@Param('id') id: number) {
    return this.membersService.restore(+id);
  }
}
