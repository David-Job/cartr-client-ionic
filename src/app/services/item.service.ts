import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import Item from '../models/item';

const itemUrl = 'item';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private apiService: ApiService) {}

  getAllItems = () => this.apiService.getAll<Item>(itemUrl);

  getItem = (id: string) => this.apiService.get<Item>(id, itemUrl);

  addItem = (item: Item) => this.apiService.add<Item>(item, itemUrl);

  updateItem = (id: string, item: Item) => this.apiService.update<Item>(id, item, itemUrl);

  deleteItem = (id: string) => this.apiService.delete<Item>(id, itemUrl);

  deleteAllItems = () => this.apiService.deleteAll<Item>(itemUrl);
}
