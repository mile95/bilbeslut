import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.html',
  styleUrls: ['./form.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor
  ],
})
export class FormComponent implements OnInit {
  form!: FormGroup;

  arrangementOptions = [
    { label: 'Privateasing', controlName: 'leasing' },
  ];

  fuelOptions = [
    { label: 'Bensin', controlName: 'bensin' },
    { label: 'Diesel', controlName: 'diesel' },
    { label: 'El', controlName: 'el' },
    { label: 'Hybrid', controlName: 'hybrid' },
  ];

  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    const arrangementControls = this.arrangementOptions.reduce((acc, option) => {
      acc[option.controlName] = [false];
      return acc;
    }, {} as { [key: string]: any });

    const fuelControls = this.fuelOptions.reduce((acc, option) => {
      acc[option.controlName] = [false];
      return acc;
    }, {} as { [key: string]: any });

    this.form = this.fb.group({
      ...arrangementControls,
      ...fuelControls,
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const selectedArrangements = this.arrangementOptions
        .filter((opt) => this.form.get(opt.controlName)?.value)
        .map((opt) => opt.label);

      const selectedFuels = this.fuelOptions
        .filter((opt) => this.form.get(opt.controlName)?.value)
        .map((opt) => opt.label);

      const data = {
        arrangements: selectedArrangements,
        fuels: selectedFuels,
      };

      console.log('Form data:', data);
    }

  }


}
