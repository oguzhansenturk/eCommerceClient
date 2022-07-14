import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerName } from 'src/app/base/base.component';
import { Product } from 'src/app/models/product';
import { HttpclientService } from 'src/app/services/common/httpclient.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner : NgxSpinnerService, private httpClientService: HttpclientService){ 
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerName.BallAtom);

     this.httpClientService.get<Product[]>({
       controller: "products"
     }).subscribe(data=> console.log(data));

    // this.httpClientService.post(
    //   {
    //     controller: "products"},
    //     {
    //       name:"Kalem",
    //       stock:100,
    //       price:10
    //     }
    //   ).subscribe();

    // this.httpClientService.put({
    //   controller: "products"},{
    //     id:"2e9500cd-48b9-46b6-b5a0-1c8a0f699d87",
    //     name:"KalemGuncel",
    //     stock:120,
    //     price:20
    //   }
    // ).subscribe();

    // this.httpClientService.delete({
    //   controller: "products"},"2e9500cd-48b9-46b6-b5a0-1c8a0f699d87").subscribe();  

    // this.httpClientService.get({
    //   baseUrl:"https://jsonplaceholder.typicode.com",
    //   controller: "posts"
    // }).subscribe(data=> console.log(data));

  }
}
