import { Component, OnInit } from '@angular/core';
import { HttpService, Shelf } from 'src/app/http.service'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {



  shelfs: Shelf[] = [
    {
      shelfId: null,
      shelfOrder: 0,
      products: []
    },
    {
      shelfId: null,
      shelfOrder: 1,
      products: []
    },
    {
      shelfId: null,
      shelfOrder: 2,
      products: []
    },
    {
      shelfId: null,
      shelfOrder: 3,
      products: []
    },
    {
      shelfId: null,
      shelfOrder: 4,
      products: []
    }
  ];

  constructor(private http: HttpService) { }

  ngOnInit() {
    // Cекретный ключ добавлен в .gitignore файл.
    this.http.getData('https://api.jsonbin.io/b/5e6b40e207f1954acedf3427/1', environment.secretKey).subscribe(shelfs => {
      shelfs.forEach(shelf => {
        this.shelfs[this.shelfs.findIndex((item) => {
          return item.shelfOrder === shelf.shelfOrder;
        })] = shelf;
      });

      this.filterShelf();
    })

  }

  filterShelf() {
    this.shelfs.forEach((shelf) => {
      let arr = new Array(shelf.products.length);
      for (let product of shelf.products) {
        arr[product.productOrder - 1] = product
      }
      shelf.products = arr;
    })
  }

}

