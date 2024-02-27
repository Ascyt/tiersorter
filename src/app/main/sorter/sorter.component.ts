import { Component } from '@angular/core';
import { Value, ValuesService } from '../values.service';
import { SortStepService } from './sort-step.service';

@Component({
  selector: 'app-sorter',
  standalone: true,
  imports: [],
  templateUrl: './sorter.component.html',
  styleUrl: './sorter.component.scss'
})
export class SorterComponent {
  constructor(private valuesService: ValuesService, private sortStepService:SortStepService) {

  }

  public get decisionLeft(): (Value|undefined) {
    return this.sortStepService.currentDecision[0];
  }
  public get decisionRight(): (Value|undefined) {
    return this.sortStepService.currentDecision[1];
  }
}
