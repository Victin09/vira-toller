import { Model } from 'mongoose';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = new this.userModel(createUserDto);
      return newUser.save();
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: user not created',
        },
        500,
      );
    }
  }

  findAll(): Promise<User[]> {
    try {
      return this.userModel.find().select('-_id -password -__v').exec();
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userModel.findOne({ email });
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: user not found',
        },
        500,
      );
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error: user not updated',
        },
        500,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
