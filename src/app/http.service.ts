import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Shelf{
  shelfId: number;
  shelfOrder: number;
  products: Product[];
}

export interface Product{
  productId: number;
  productUrl: string;
  productOrder: number;
}



@Injectable({providedIn:'root'})
export class HttpService{
    constructor(private http:HttpClient){}

    getData(url, secretkey){
        return this.http.get<Shelf[]>(url, {
            headers: new HttpHeaders({
              'Secret-key': `${secretkey}`
            })
          })
    }

}