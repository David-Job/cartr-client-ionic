import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import User from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private apiService: ApiService) {}

  getAllUsers = () => this.apiService.getAll<User>('user');

  getUser = (id: any) => this.apiService.get<User>(id, 'user');

  addUser = (user: User) => this.apiService.add<User>(user, 'user');

  updateUser = (id: any, user: User) => this.apiService.update<User>(id, user, 'user');

  deleteUser = (id: any) => this.apiService.delete<User>(id, 'user');

  deleteAllUsers = () => this.apiService.deleteAll<User>('user');
}

