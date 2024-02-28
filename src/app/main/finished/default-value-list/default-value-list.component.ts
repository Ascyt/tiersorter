import { Component } from '@angular/core';
import { ValuesService } from '../../values.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-default-value-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './default-value-list.component.html',
  styleUrl: './default-value-list.component.scss'
})
export class DefaultValueListComponent {
  constructor(public valuesService: ValuesService) { 

  }
}
