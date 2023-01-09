import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { ProductColorModel } from '../models/product-color.model';
import { ProductStoreModel } from '../models/product-store.model';

@Injectable({providedIn: 'root'})
export class ProductsService {
  constructor(private _httpClient: HttpClient) {
  }

  getAll(): Observable<ProductModel[]> {
    return this._httpClient.get<ProductModel[]>('https://636ce2d8ab4814f2b2712854.mockapi.io/products');
  }

  getColors(): Observable<ProductColorModel[]> {
    return this._httpClient.get<ProductColorModel[]>('https://636ce2d8ab4814f2b2712854.mockapi.io/product-color');
  }

  getStores(): Observable<ProductStoreModel[]> {
    return this._httpClient.get<ProductStoreModel[]>('https://636ce2d8ab4814f2b2712854.mockapi.io/product-store');
  }
}
