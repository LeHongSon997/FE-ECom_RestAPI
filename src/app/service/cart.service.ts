import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItem: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {
    let alreadyExistsInCart: boolean = false;
    // @ts-ignore
    let existingCartItem: CartItem = undefined;

    if (this.cartItem.length > 0) {
     // @ts-ignore
      existingCartItem = this.cartItem.find( tempCartItem => tempCartItem.id === theCartItem.id);

      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItem.push(theCartItem);
    }

    this.computeCartTotal();
  }

  computeCartTotal() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currenCartItem of this.cartItem) {
      totalPriceValue += currenCartItem.quantity * currenCartItem.unitPrice;
      totalQuantityValue += currenCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
   console.log('Contents of the cart');
   for (let tempCartItem of this.cartItem) {
    const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
    console.log(`name: ${tempCartItem.name}, quantity: ${tempCartItem.quantity}, unitPrice: ${tempCartItem.unitPrice}`);
   }

   console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
   console.log('----');
  }

  decrementQuantity(theCartItem: CartItem) {

    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    }
    else {
      this.computeCartTotal();
    }
  }

  remove(theCartItem: CartItem) {

    // get index of item in the array
    const itemIndex = this.cartItem.findIndex( tempCartItem => tempCartItem.id === theCartItem.id );

    // if found, remove the item from the array at the given index
    if (itemIndex > -1) {
      this.cartItem.splice(itemIndex, 1);

      this.computeCartTotal();
    }
  }
  
}
