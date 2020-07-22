import { Component, Input,} from '@angular/core';
import { Shelf, Product } from 'src/app/http.service'

@Component({
  selector: 'app-display-rack',
  templateUrl: './display-rack.component.html',
  styleUrls: ['./display-rack.component.scss']
})
export class DisplayRackComponent {

  @Input() shelfs: Shelf[];

  printShelfs = [4,3,2,1,0];

  loading: boolean = false;
  dragBtnIsVisible: boolean = false;

  currentProduct: Product;
  currentShelf: Shelf;

  constructor() { }

  filterShelf(){
    this.shelfs.forEach((shelf) => {
      let arr = new Array(shelf.products.length);
      for (let key in shelf.products){
        arr[shelf.products[key].productOrder - 1] = shelf.products[key];
      }
      shelf.products = arr;
    })
  }

  dragStart(product, shelf){
    this.dragBtnIsVisible = true;

    this.currentProduct = product;
    this.currentShelf = shelf;
  }

  dragEnd(){
    this.dragBtnIsVisible = false;
  }

  dragOver(event){
    event.preventDefault();
  }

  drop(product, shelf){
    this.shiftOnShelf(product, shelf);
  }

  dragGrabBtnOver(event){
    event.preventDefault();
  }

  dropGrabBtn(shelf){
      this.shiftOnOtherShelf(shelf);
  }



  shiftOnShelf(productTwo, shelfTwo){
    const shelfOrderOne = this.currentShelf.shelfOrder;
    const productOrderOne = this.currentProduct.productOrder;
    const shelfOrderTwo = shelfTwo.shelfOrder;
    const productOrderTwo  = productTwo.productOrder;

    if(shelfOrderOne === shelfOrderTwo){

      this.currentProduct.productOrder = productOrderTwo
      productTwo.productOrder = productOrderOne;

      this.filterShelf();
    }
    
  }

  shiftOnOtherShelf(shelfTwo){
    const shelfOrderOne = this.currentShelf.shelfOrder;
    const productOrderOne = this.currentProduct.productOrder;
    const shelfOrderTwo = shelfTwo.shelfOrder;

    shelfTwo.products.push(this.currentProduct);

    for(let key in this.shelfs[shelfOrderTwo].products){
      this.shelfs[shelfOrderTwo].products[key].productOrder = +key + 1;
    }

    this.currentShelf.products.splice(productOrderOne - 1, 1);

    this.currentShelf.products.forEach((product) => {
      if(product.productOrder > productOrderOne){
        product.productOrder += -1;
      }
    })

  }






}
