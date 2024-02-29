import { Component, EventEmitter, Output, HostListener } from '@angular/core';
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
  @Output() public startOver = new EventEmitter();

  constructor(private valuesService: ValuesService, public sortStepService:SortStepService) {

  }

  public get decisionLeft(): (Value|undefined) {
    return this.sortStepService.currentDecision[0];
  }
  public get decisionRight(): (Value|undefined) {
    return this.sortStepService.currentDecision[1];
  }
  
  @HostListener('document:keydown.arrowleft', ['$event'])
  public decisionLeftMade(event:KeyboardEvent|undefined = undefined): void {
    this.decisionMade(true);
  }
  @HostListener('document:keydown.arrowright', ['$event'])
  public decisionRightMade(event:KeyboardEvent|undefined = undefined): void {
    this.decisionMade(false);
  }

  private decisionMade(isLeft: boolean): void {
    const isFinished:boolean = this.sortStepService.sortSingleStep(isLeft);

    if (isFinished) {
      this.sortingComplete.emit();
      return;
    }

    this.sortStepService.currentDecision = this.sortStepService.getDecision();
  }

  @HostListener('document:keydown.backspace', ['$event'])
  public previousStep(event:KeyboardEvent|undefined = undefined): void {
    this.sortStepService.previousStep();

    this.sortStepService.currentDecision = this.sortStepService.getDecision();
  }

  @HostListener('document:keydown.control.backspace', ['$event'])
  public startOverClicked(event:KeyboardEvent|undefined = undefined): void {
    this.startOver.emit();
  }
}
