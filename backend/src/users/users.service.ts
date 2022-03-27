import { Model } from 'mongoose';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = new this.userModel(createUserDto);
      return await newUser.save();
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: user not created',
        },
        500,
      );
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find().select('-password -__v').exec();
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findOne(id: string) {
    try {
      return await this.userModel.findById(id);
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: user not found',
        },
        500,
      );
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userModel.findOne({ email }).select('-__v');
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: user not found',
        },
        500,
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
        new: true,
      });
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: user not updated',
        },
        500,
      );
    }
  }

  async updateLastLogin(email: string) {
    try {
      return await this.userModel
        .findOneAndUpdate({ email }, { lastLogin: new Date() }, { new: true })
        .select('-password -__v');
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: user not updated',
        },
        500,
      );
    }
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
