import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import Cart from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  constructor(private apiService: ApiService) {}

  getAllCarts = () => this.apiService.getAll<Cart>('cart');

  getCart = (id: any) => this.apiService.get<Cart>(id, 'cart');

  addCart = (cart: Cart) => this.apiService.add<Cart>(cart, 'cart');

  updateCart = (id: any, cart: Cart) => this.apiService.update<Cart>(id, cart, 'cart');

  deleteCart = (id: any) => this.apiService.delete<Cart>(id, 'cart');

  deleteAllCarts = () => this.apiService.deleteAll<Cart>('cart');
}

