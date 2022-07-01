import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-category-memu',
  templateUrl: './product-category-memu.component.html',
  styleUrls: ['./product-category-memu.component.css']
})
export class ProductCategoryMemuComponent implements OnInit {

  productCategories!: ProductCategory[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.thisProductCategories();
  }
  thisProductCategories() {
   this.productService.getProductCategorise().subscribe(
      data => {
      console.log('Product Categories=' + JSON.stringify(data));
      this.productCategories = data;
    } 
   );
  }

}
