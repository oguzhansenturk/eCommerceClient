import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerName } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/models/create_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import {FileUploadOptions} from "../../../../services/common/file-upload/file-upload.component";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService, private productService: ProductService, private alertify:AlertifyService) {
    super(spinner);
  }

  ngOnInit(): void {

  }

  @Output() createProduct: EventEmitter<Create_Product> = new EventEmitter;
  @Output()fileUploadOptions:Partial<FileUploadOptions> = {
    action:"upload",
    controller:"products",
    explanation:"Resimleri sürükleyin veya seçin",
    isAdminPage:true,
    accept:".png,.jpg,.jpeg"
  };
  create(name:HTMLInputElement,stock:HTMLInputElement,price:HTMLInputElement){
     this.showSpinner(SpinnerName.BallAtom);
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);



    this.productService.create(create_product,()=> {
      this.hideSpinner(SpinnerName.BallAtom);
      this.alertify.message("Ürün başarıyla oluşturuldu.",{
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.createProduct.emit(create_product);
    },
    errorMessage=> {
      this.alertify.message(errorMessage,{
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      })
    });
  }
}
