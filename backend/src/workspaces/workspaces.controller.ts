import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';

@ApiCookieAuth()
@ApiTags('workspaces')
@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  create(@Body() createWorkspaceDto: CreateWorkspaceDto) {
    return this.workspacesService.create(createWorkspaceDto);
  }

  @Get('/user/:id')
  findAllByUser(@Param('id') id: string) {
    return this.workspacesService.findAllByUser(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workspacesService.findOne(id);
  }

  @Get('/user/:id/boards')
  findAllBoardsByUser(@Param('id') id: string) {
    return this.workspacesService.getAllWorkspacesWithBoardsByUser(id);
  }

  @Patch(':id/users/add/:userId')
  addUser(@Param('id') id: string, @Param('userId') userId: string) {
    return this.workspacesService.addUser(id, userId);
  }

  @Patch(':id/users/remove/:userId')
  removeUser(@Param('id') id: string, @Param('userId') userId: string) {
    return this.workspacesService.removeUser(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    return this.workspacesService.update(id, updateWorkspaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workspacesService.remove(id);
  }
}
