import { Model } from 'mongoose';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { Workspace, WorkspaceDocument } from './schemas/workspace.schema';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectModel(Workspace.name)
    private workspaceModel: Model<WorkspaceDocument>,
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
      return await this.workspaceModel.find({ members: id }).exec();
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

  update(id: string, updateWorkspaceDto: UpdateWorkspaceDto) {
    try {
      return this.workspaceModel.findByIdAndUpdate(id, updateWorkspaceDto, {
        new: true,
      });
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: workspace not updated',
        },
        500,
      );
    }
  }

  remove(id: string) {
    try {
      return this.workspaceModel.findByIdAndRemove(id);
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
