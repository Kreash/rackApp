import { Component, OnInit, Input } from '@angular/core';
import { Shelf } from 'src/app/http.service'

@Component({
  selector: 'app-display-rack',
  templateUrl: './display-rack.component.html',
  styleUrls: ['./display-rack.component.scss']
})
export class DisplayRackComponent implements OnInit {

  @Input() data: Shelf[];

  productsLis;
  grabBtnsLis;

  printShelfs = [4,3,2,1,0];
  shelfs: any = [0, 1, 2, 3, 4];
  products: any = [];

  loading: boolean = true;
  oneAddress: string;

  dragStartPer = (e) => { this.dragStart(e)};
  dragEndPer = () => {this.dragEnd()};
  dragOverPer = (e) => {this.dragOver(e)};
  dropPer = (e) => {this.drop(e)};

  dragGrabBtnOverPer = (e) => {this.dragGrabBtnOver(e)};
  dropGrabBtnPer = (e) => {this.dropGrabBtn(e)}

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.renderShelf();
    }, 1000);

    setTimeout(() => {
      this.addEvLis();

      let grabshelfBox = document.querySelectorAll('.shelfBox');
      grabshelfBox.forEach((grabshelfBox) => {
      grabshelfBox.addEventListener('drop', () => {this.dropgrabshelfBox()});
      });
    }, 1050);
  }

  dropgrabshelfBox(){
    this.removeEvLis();
    this.addEvLis();
  }

  renderShelf(){
    for (let i = 0; i < this.data.length; i ++){
      this.shelfs[this.data[i].shelfOrder] = this.data[i];
    }

    for (let item in this.shelfs){
      this.products[item] = (this.shelfs[item].products);
    }

    for (let key in this.shelfs){
        let arr = new Array(this.shelfs[key].products.length);
        for (let i = 0; i < arr.length; i ++){
          arr[this.shelfs[key].products[i].productOrder - 1] = this.shelfs[key].products[i];
        }
        this.shelfs[key].products = arr;
    }
    this.loading = false;
  }

  addEvLis(){
    this.productsLis = document.querySelectorAll('.product');
    this.productsLis.forEach((product) => {
      product.addEventListener('dragstart', this.dragStartPer);
      product.addEventListener('dragend', this.dragEndPer);
      product.addEventListener('dragover', this.dragOverPer);
      product.addEventListener('drop', this.dropPer);
    });

    this.grabBtnsLis = document.querySelectorAll('.dragBtn');
    this.grabBtnsLis.forEach((grabBtn) => {
      grabBtn.addEventListener('dragover', this.dragGrabBtnOverPer);
      grabBtn.addEventListener('drop', this.dropGrabBtnPer);
    });
    // console.log('ADD LISTONER')
  }

  removeEvLis(){
    this.productsLis.forEach((product) => {
      product.removeEventListener('dragstart', this.dragStartPer);
      product.removeEventListener('dragend', this.dragEndPer);
      product.removeEventListener('dragover', this.dragOverPer);
      product.removeEventListener('drop', this.dropPer);
    });

    this.grabBtnsLis.forEach((grabBtn) => {
      grabBtn.removeEventListener('dragover', this.dragGrabBtnOverPer);
      grabBtn.removeEventListener('drop', this.dropGrabBtnPer);
    });
    // console.log('REMOVE LISTONER');
  }



  dragStart(event){
    const grabBtns = document.querySelectorAll('.dragBtn');
    grabBtns.forEach((grabBtn) => {
      grabBtn.classList.add('dragBtnVisible');
    });

    const x = event.clientX;
    const y = event.clientY;

    let elem = document.elementFromPoint(x, y);
    this.oneAddress = elem.id;
  }

  dragEnd(){
    const grabBtns = document.querySelectorAll('.dragBtn');
    grabBtns.forEach((grabBtn) => {
      grabBtn.classList.remove('dragBtnVisible');
    });
  }

  dragOver(event){
    event.preventDefault();
  }

  drop(event){
    const x = event.clientX;
    const y = event.clientY;

    let elem = document.elementFromPoint(x, y);
    let address = elem.id;

    this.shiftOnShelf(address);
  }

  dragGrabBtnOver(event){
    event.preventDefault();
  }

  dropGrabBtn(event){
      const x = event.clientX;
      const y = event.clientY;

      let elem = document.elementFromPoint(x, y);
      let address = elem.id;

      this.shiftOnOtherShelf(address);
  }



  shiftOnShelf(address){
    const shelfIdOne = this.oneAddress.slice(0, 1);
    const productIdOne = this.oneAddress.slice(2, 3);
    const shelfIdTwo = address.slice(0, 1);
    const productIdTwo  = address.slice(2, 3);

    if(shelfIdOne === shelfIdTwo){
      this.shelfs[shelfIdTwo].products = this.shelfs[shelfIdTwo].products.map((item) => {
        for (let key in item){
          if (key === 'productOrder'){
            if(item[key] == productIdOne){
              item[key] = +productIdTwo;
            } else if(item[key] == productIdTwo){
              item[key] = +productIdOne;
            }
          }
        }
        return item;
      })

      for (let key in this.shelfs){
        let arr = new Array(this.shelfs[key].products.length);
        for (let i = 0; i < arr.length; i ++){
          arr[this.shelfs[key].products[i].productOrder - 1] = this.shelfs[key].products[i];
        }
        this.shelfs[key].products = arr;
      }
    }
  }

  shiftOnOtherShelf(address){
    const shelfIdOne = +this.oneAddress.slice(0, 1);
    const productIdOne = +this.oneAddress.slice(2, 3);
    const shelfIdTwo = +address;

    let neededShelfOne = this.shelfs[shelfIdOne].products;

    this.shelfs[shelfIdTwo].products.push(this.shelfs[shelfIdOne].products[productIdOne - 1]);

    for(let item in this.shelfs[shelfIdTwo].products){
      this.shelfs[shelfIdTwo].products[item].productOrder = +item + 1;
    }

    neededShelfOne.splice(productIdOne - 1, 1);

    for (let item of this.shelfs[shelfIdOne].products){
      if(item.productOrder > productIdOne){
        item.productOrder += -1;
      }
    }
  }



}
