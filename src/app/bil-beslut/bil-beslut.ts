import { Component } from '@angular/core';
import { FormComponent } from "./form/form";
import { PrivateLeasing } from './private-leasing/private-leasing.model';
import { PRIVATE_LEASING_OFFERS } from './private-leasing/private-leasing.data';
import { PrivateLeasingResult } from "./private-leasing/private-leasing-result/private-leasing-result";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-bil-beslut',
  imports: [FormComponent, PrivateLeasingResult, NgFor],
  templateUrl: './bil-beslut.html',
  styleUrl: './bil-beslut.css',
})
export class BilBeslut {

  results: PrivateLeasing[] = [];

  constructor() { }

  handleFormSubmit(data: any) {
    this.results = PRIVATE_LEASING_OFFERS;
  }

}
