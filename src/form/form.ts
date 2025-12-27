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

  upplaggOptions = [
    { label: 'Ny bil', controlName: 'ny' },
    { label: 'Leasing', controlName: 'leasing' },
    { label: 'Begagnad', controlName: 'privatKopBegagnad' },
  ];

  drivmedelOptions = [
    { label: 'Bensin', controlName: 'bensin' },
    { label: 'Diesel', controlName: 'diesel' },
    { label: 'El', controlName: 'el' },
    { label: 'Hybrid', controlName: 'hybrid' },
  ];

  bilmarkenOptions = [
    'Volvo',
    'Volkswagen',
    'Toyota',
    'Ford',
    'BMW',
    'Audi',
    'Tesla',
    'Skoda',
    'Mercedes',
    'Hyundai',
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    const upplaggControls = this.upplaggOptions.reduce((acc, option) => {
      acc[option.controlName] = [false];
      return acc;
    }, {} as { [key: string]: any });

    const drivmedelControls = this.drivmedelOptions.reduce((acc, option) => {
      acc[option.controlName] = [false];
      return acc;
    }, {} as { [key: string]: any });

    this.form = this.fb.group({
      ...upplaggControls,
      ...drivmedelControls,

      bilmärken: [this.bilmarkenOptions], // default: alla valda
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const valdaUpplagg = this.upplaggOptions
        .filter((opt) => this.form.get(opt.controlName)?.value)
        .map((opt) => opt.label);

      const valdaDrivmedel = this.drivmedelOptions
        .filter((opt) => this.form.get(opt.controlName)?.value)
        .map((opt) => opt.label);

      const valdaBilmarken = this.form.value.bilmärken;

      const data = {
        upplagg: valdaUpplagg,
        drivmedel: valdaDrivmedel,
        bilmärken: valdaBilmarken,
      };

      console.log('Form data:', data);
    }

  }


}
