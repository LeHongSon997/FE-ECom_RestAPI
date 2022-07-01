import { keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;
  
  previousKeyword: string = '';

  constructor(private productService: ProductService, private cartService: CartService,private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.paramMap.subscribe(() => {
      this.listProducts();
    });
  }
  
  listProducts() {
    this.searchMode = this.router.snapshot.paramMap.has('keyword');
    if(this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }
  handleSearchProducts() {
    const theKeyword: string = this.router.snapshot.paramMap.get('keyword');

    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    this.productService.searchProductListPaginate(this.thePageNumber - 1,
      this.thePageSize,
      theKeyword)
      .subscribe(this.processResult());
  }

  handleListProducts() {

    // check if "id" parameter available
    const hasCategoryId: boolean = this.router.snapshot.paramMap.has('id');

    if(hasCategoryId) {
      //get the "id" param string --> "+" symbol
      this.currentCategoryId = +this.router.snapshot.paramMap.get('id');
    } else {
      // not category id available
      this.currentCategoryId = 1;
    }

    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

    //now get
    this.productService.getProductListPaginate(this.thePageNumber - 1,
                                              this.thePageSize,
                                              this.currentCategoryId)
                                              .subscribe(this.processResult());
  }

  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  addToCart(theProduct: Product) {
    console.log(`Adding to Card: ${theProduct.name}, ${theProduct.unitPrice}`);

    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }

}
