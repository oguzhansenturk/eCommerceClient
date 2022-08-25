import {Component, OnInit, ViewChild} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerName } from 'src/app/base/base.component';
import { HttpclientService } from 'src/app/services/common/httpclient.service';
import {Create_Product} from "../../../models/create_product";
import {ListComponent} from "./list/list.component";

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
  }


  @ViewChild(ListComponent) listComponent: ListComponent;

  async createdProduct(createdProduct: Create_Product) {
    await this.listComponent.getProducts();
  }


}
