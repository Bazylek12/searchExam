import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {combineLatest, map, Observable, startWith} from 'rxjs';
import { ProductStoreModel } from '../../models/product-store.model';
import { ProductColorModel } from '../../models/product-color.model';
import { ProductModel } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  styleUrls: ['./products.component.scss'],
  templateUrl: './products.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {
  readonly searchForm: FormGroup = new FormGroup({
    color: new FormControl(),
    store: new FormControl(),
    term: new FormControl(),
  }
  );
  readonly storeList$: Observable<ProductStoreModel[]> = combineLatest([
    this._productsService.getStores(),
    this.searchForm.valueChanges.pipe(startWith({store: ''}))
  ]).pipe(
    map(([stores, searchForm]) =>
      stores.filter(store => store.name.toLowerCase().includes(searchForm.store.toLowerCase()))
    )
  )
  readonly colorList$: Observable<ProductColorModel[]> = combineLatest([
    this._productsService.getColors(),
    this.searchForm.valueChanges.pipe(startWith({color: ''}))
  ]).pipe(
    map(([colors, searchForm]) =>
      colors.filter(color => color.name.toLowerCase().includes(searchForm.color.toLowerCase()))
    )
  )
  readonly productList$: Observable<ProductModel[]> = combineLatest([
    this._productsService.getAll(),
    this.searchForm.valueChanges.pipe(startWith({color: '', store: '', term: ''})),
  ]).pipe(
    map(([products, search]) =>
      products.filter(product =>
        product.colorId.includes(search.color ? search.color?.toString() : '') &&
        product.storeId.includes(search.store ? search.store?.toString() : '') &&
        (product.name.toLowerCase().includes(search.term ? search.term.toLowerCase() : '') ||
        product.price?.toString().includes(search.term ? search.term : ''))
      )
    )
  )

  constructor(private _productsService: ProductsService) {
  }

}
