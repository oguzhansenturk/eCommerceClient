import {Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {SpinnerName} from "../../base/base.component";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent, DeleteState} from "../../dialogs/delete-dialog/delete-dialog.component";
import {HttpclientService} from "../../services/common/httpclient.service";
import {AlertifyService, MessageType, Position} from "../../services/admin/alertify.service";
import {HttpErrorResponse} from "@angular/common/http";

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element:ElementRef,
    private _renderer:Renderer2,
    private httpClientService: HttpclientService,
    private spinner : NgxSpinnerService,
    public dialog: MatDialog,
    private altertifyService:AlertifyService
  )
  {
    const img = _renderer.createElement('img');
    img.setAttribute('src','../../../../../assets/delete.png');
    img.setAttribute('style','cursor:pointer');
    img.width = 25;
    img.height = 25;
    _renderer.appendChild(element.nativeElement,img);
  }

  @Input() id: string;
  @Input() controller:string;
  @Output() callback : EventEmitter<any> = new EventEmitter<any>();

  @HostListener("click")
  async onclick(){
    this.openDialog(async ()=>{
      await this.spinner.show(SpinnerName.BallAtom);
      const td : HTMLTableCellElement = this.element.nativeElement;
      this.httpClientService.delete({
        controller:this.controller,
      },this.id).subscribe(data =>{
        $(td.parentElement).animate({
          opacity: 0,
          left: "+=50",
          height: "toggle"
        },700,()=>{
          this.callback.emit();
          this.altertifyService.message("Silme işlemi başarılı",{
            dismissOthers:true,
            position:Position.TopRight,
            messageType:MessageType.Success
          });
        });
      },(errorResponse:HttpErrorResponse)=>{
        this.spinner.hide(SpinnerName.BallAtom);
        this.altertifyService.message("Ürün silerken beklenmeyen bir hata ile karşılaşıldı.",{
          dismissOthers:true,
          position:Position.TopRight,
          messageType:MessageType.Error
        });
      })
    })
  }

  openDialog(afterClosed:any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == DeleteState.Yes){
        afterClosed();
      }
    });
  }

}
