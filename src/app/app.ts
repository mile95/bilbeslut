import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BilBeslut } from "./bil-beslut/bil-beslut";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BilBeslut],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bilbeslut');
}
