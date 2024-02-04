import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValuesService, Value } from '../values.service';
import { ValueInputComponent } from './value-input/value-input.component';

@Component({
  selector: 'app-initialize',
  standalone: true,
  imports: [CommonModule, ValueInputComponent],
  templateUrl: './initialize.component.html',
  styleUrl: './initialize.component.scss'
})
export class InitializeComponent {
  public values: Value[] = this.valuesService.values;

  constructor(private valuesService: ValuesService) { }

  public addValue(): void {
    this.values.push(this.valuesService.getNewValue());
  }

  public removeValue(index: number): void {
    this.values.splice(index, 1);
  }

  public onSubmit(): void {
    console.log(this.values);
  }
}
