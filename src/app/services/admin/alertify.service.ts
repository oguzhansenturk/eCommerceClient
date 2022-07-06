import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  constructor() { }

  message(message: string, option : Partial<AlertifyOptions>) {
      alertify.set('notifier','delay', option.delay);
      alertify.set('notifier', 'position', option.position);
      const msj = alertify[option.messageType](message);
      if(option.dismissOthers)
        msj.dismissOthers();
  }

dismiss(){
  alertify.dismissAll();
}

}

export class AlertifyOptions {
  messageType: MessageType = MessageType.Message;
  position: Position= Position.BottomRight;
  delay: number = 3;
  dismissOthers: boolean = false;
}

export enum MessageType{
  Error = "error",
  Message = "message",
  Success = "success",
  Warning = "warning",
  Notify = "notify"
}

export enum Position{ 
  TopCenter = "top-center",
  TopLeft = "top-left",
  TopRight = "top-right",
  BottomCenter = "bottom-center",
  BottomLeft = "bottom-left",
  BottomRight = "bottom-right" 
}
