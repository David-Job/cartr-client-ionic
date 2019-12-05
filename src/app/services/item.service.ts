import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import Item from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class ItemService {

  constructor(private apiService: ApiService) {}

  getAllItems = () => this.apiService.getAll<Item>('item');

  getItem = (id: any) => this.apiService.get<Item>(id, 'item');

  addItem = (item: Item) => this.apiService.add<Item>(item, 'item');

  updateItem = (id: any, item: Item) => this.apiService.update<Item>(id, item, 'item');

  deleteItem = (id: any) => this.apiService.delete<Item>(id, 'item');

  deleteAllItems = () => this.apiService.deleteAll<Item>('item');
}
