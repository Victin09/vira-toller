import { Model } from 'mongoose';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { Workspace, WorkspaceDocument } from './schemas/workspace.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectModel(Workspace.name)
    private workspaceModel: Model<WorkspaceDocument>,
    private userService: UsersService,
  ) {}

  async create(createWorkspaceDto: CreateWorkspaceDto): Promise<Workspace> {
    try {
      let workspace = await this.workspaceModel.findOne({
        name: createWorkspaceDto.name,
      });
      if (workspace) {
        throw new HttpException(
          {
            error: 'Error: workspace already exists',
          },
          500,
        );
      }
      workspace = new this.workspaceModel(createWorkspaceDto);
      return workspace.save();
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: user not created',
        },
        500,
      );
    }
  }

  async findAllByUser(id: string): Promise<Workspace[]> {
    try {
      return await this.workspaceModel
        .find({ members: id })
        .populate('members')
        .exec();
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: workspace not found',
        },
        500,
      );
    }
  }

  async findOne(id: string): Promise<Workspace> {
    try {
      return await this.workspaceModel.findById(id);
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: workspace not found',
        },
        500,
      );
    }
  }

  async addUser(id: string, userId: string): Promise<Workspace> {
    try {
      const user = await this.userService.findOne(userId);
      const workspace = await this.workspaceModel.findById(id);
      if (workspace.members.includes(user._id)) {
        throw new HttpException(
          {
            error: 'Error: user already in workspace',
          },
          500,
        );
      }
      return await this.workspaceModel.findByIdAndUpdate(
        id,
        {
          $push: {
            members: user._id,
          },
        },
        {
          new: true,
        },
      );
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: workspace not found',
        },
        500,
      );
    }
  }

  async removeUser(id: string, userId: string): Promise<Workspace> {
    try {
      const user = await this.userService.findOne(userId);
      const workspace = await this.workspaceModel.findById(id);
      if (!workspace.members.includes(user._id)) {
        throw new HttpException(
          {
            error: 'Error: user not in workspace',
          },
          500,
        );
      }
      return await this.workspaceModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            members: user._id,
          },
        },
        {
          new: true,
        },
      );
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: workspace not found',
        },
        500,
      );
    }
  }

  async update(
    id: string,
    updateWorkspaceDto: UpdateWorkspaceDto,
  ): Promise<Workspace> {
    try {
      return await this.workspaceModel.findByIdAndUpdate(
        id,
        updateWorkspaceDto,
        {
          new: true,
        },
      );
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: workspace not updated',
        },
        500,
      );
    }
  }

  async remove(id: string): Promise<void> {
    try {
      return await this.workspaceModel.findByIdAndRemove(id);
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: workspace not deleted',
        },
        500,
      );
    }
  }
}
