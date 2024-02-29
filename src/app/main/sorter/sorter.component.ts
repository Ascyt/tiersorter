import { Component, EventEmitter, Output } from '@angular/core';
import { Value, ValuesService } from '../values.service';
import { SortStepService } from './sort-step.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sorter',
  standalone: true,
  imports: [NgbModule],
  templateUrl: './sorter.component.html',
  styleUrl: './sorter.component.scss'
})
export class SorterComponent {
  @Output() public sortingComplete = new EventEmitter();

  constructor(private valuesService: ValuesService, public sortStepService:SortStepService) {

  }

  public get decisionLeft(): (Value|undefined) {
    return this.sortStepService.currentDecision[0];
  }
  public get decisionRight(): (Value|undefined) {
    return this.sortStepService.currentDecision[1];
  }

  public decisionMade(isLeft: boolean): void {
    const isFinished:boolean = this.sortStepService.sortSingleStep(isLeft);

    if (isFinished) {
      this.sortingComplete.emit();
      return;
    }

    this.sortStepService.currentDecision = this.sortStepService.getDecision();
  }

  public previousStep(): void {
    this.sortStepService.previousStep();

    this.sortStepService.currentDecision = this.sortStepService.getDecision();
  }
}
