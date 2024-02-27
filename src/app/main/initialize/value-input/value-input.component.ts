import { Component, Input } from '@angular/core';
import { ValuesService, Value } from '../../values.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-value-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './value-input.component.html',
  styleUrl: './value-input.component.scss'
})
export class ValueInputComponent {
  @Input() value: Value = this.valuesService.getNewValue();

  constructor(private valuesService: ValuesService) { }

  public onDelete(): void {
    this.valuesService.values.splice(this.valuesService.values.indexOf(this.value), 1);
  }
}
