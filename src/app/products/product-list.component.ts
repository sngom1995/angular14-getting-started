import {Component, OnDestroy, OnInit} from "@angular/core";
import {IProduct} from "./product";
import {ProductService} from "./product.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{
  pgTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  private _listFilter: string = '';
  constructor(private productService: ProductService) {


  }
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }
  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];
  errorMessage: string = '';
  sub: Subscription | undefined;
  toggleImage(): void{
    this.showImage = !this.showImage;
  }
  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().includes(this.listFilter));
  }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
    this.listFilter = '';
  }

  onRatingClicked(message: string): void {
    this.pgTitle = 'Product List: ' + message;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
