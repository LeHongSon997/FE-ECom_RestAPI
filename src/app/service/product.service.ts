import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }
  
  getProductList(categoryId: number): Observable<Product[]> {

	const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

	return this.getProducts(searchUrl);
  }

  getProductListPaginate(thePage: number, thePageSize: number , categoryId: number): Observable<GetResponseProducts> {

	const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`
	                   + `&page=${thePage}&size=${thePageSize}`;

	return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductCategorise(): Observable<ProductCategory[]> {
	return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
		map(response => response._embedded.productCategory)
	);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

	return this.getProducts(searchUrl);
  }

  searchProductListPaginate(thePage: number, thePageSize: number , theKeyword: string): Observable<GetResponseProducts> {

	const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
	                   + `&page=${thePage}&size=${thePageSize}`;

	return this.httpClient.get<GetResponseProducts>(searchUrl);
  }


  getProduct(productId: number): Observable<Product>{
    const productUrl = `${this.baseUrl}/${productId}`;

	return this.httpClient.get<Product>(productUrl);
  }

	private getProducts(searchUrl: string): Observable<Product[]> {
		return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
			map(response => response._embedded.products)
		);
	}
}

interface GetResponseProducts {
	_embedded: {
		products: Product[];
	}

	page: {
		size: number,
		totalElements: number,
		totalPages: number,
		number: number
	}
}

interface GetResponseProductCategory {
	_embedded: {
		productCategory: ProductCategory[];
	}
}
