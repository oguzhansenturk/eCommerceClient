import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {

  constructor(private spinner : NgxSpinnerService) { }

  showSpinner(spinnerType: SpinnerName){
    this.spinner.show(spinnerType);
    setTimeout(() => this.spinner.hide(spinnerType),1000);
  }

  hideSpinner(spinnerType: SpinnerName){
    this.spinner.hide(spinnerType);
  }

}

export enum SpinnerName {
  BallAtom = 's1',
  BallScaleMultiple = 's2',
  BallSpinClockWiseFadeRotating = 's3'
}
