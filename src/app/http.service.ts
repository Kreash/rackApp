import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'

export interface Shelf{
  shelfId: number;
  shelfOrder: number;
  products: Product[];
}

export interface Product{
  productId: number;
  prouctUrl: string;
  productOrder: number;
}



@Injectable({providedIn:'root'})
export class HttpService{
    constructor(private http:HttpClient){}

    getData(){
        return this.http.get<Shelf[]>('https://api.jsonbin.io/b/5e6b40e207f1954acedf3427/1', {
            headers: new HttpHeaders({
              // Данный секретный ключ добавлен в .gitignore файл.
              'Secret-key': `${environment.secretKey}`
            })
          })
    }

}