import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    if (!name || !email || !password) {
      throw new UnauthorizedException('Complete all fields');
    }
    const userExists = await this.userModel.findOne({ email });
    if (userExists) {
      throw new UnauthorizedException('User already exists');
    }
    const newUser = {
      name,
      email,
      password,
    };
    const user = await this.userModel.create(newUser);
    return { message: 'User created', user };
  }

  async findAll() {
    const users = await this.userModel.find();
    return users;
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { ...user, ...updateUserDto },
      { new: true },
    );
    return { message: 'User updated', updatedUser };
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.userModel.findByIdAndDelete(id);
    return { message: 'User deleted' };
  }
}
