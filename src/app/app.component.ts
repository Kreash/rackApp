import { Component, OnInit } from '@angular/core';
import { HttpService,  Shelf  } from 'src/app/http.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpService) {}

  data: Shelf[];

  ngOnInit() {
    this.http.getData().subscribe(data => {
      this.data = JSON.parse(JSON.stringify(data));
      console.log('First data: ', data);

      this.fillShelfs(data);

    })
  }

  fillShelfs(data){
    let arr = [0,1,2,3,4];

    for (let item in data) {
      for (let i in arr){
        if(data[item].shelfOrder == arr[i]){
          arr.splice(+i, 1) 
        }
      }
    }

    for (let i in arr){
      let j = arr[i];
      this.data.push(this.createShelf(j));
    }
  }

  createShelf(order){
    return {
      shelfId: null,
      shelfOrder: order,
      products: []
    }
  }

  // Функционлан удаления Url для удобства представления состояния стелажа.

  // deleteUrl = function(obj){
  //   for (let key in obj ){
  //     if(typeof obj[key] == 'object'){
  //       this.deleteUrl(obj[key]);
  //     } else if(typeof obj[key] == 'number'){
  //     } else if (typeof obj[key] == 'string'){
  //       obj[key] = '...';
  //     }
  //   }
  // }

}
