import { NgFor } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  @Output() submitForm = new EventEmitter<any>();

  arrangementOptions = [
    { label: 'Privateasing', controlName: 'leasing' },
  ];

  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    const arrangementControls = this.arrangementOptions.reduce((acc, option) => {
      acc[option.controlName] = [true];
      return acc;
    }, {} as { [key: string]: any });

    this.form = this.fb.group({
      ...arrangementControls,
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const selectedArrangements = this.arrangementOptions
        .filter((opt) => this.form.get(opt.controlName)?.value)
        .map((opt) => opt.label);
      const data = {
        arrangements: selectedArrangements,
      };
      this.submitForm.emit(data);
    }
  }
}
