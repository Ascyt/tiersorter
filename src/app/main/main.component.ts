import { Component } from '@angular/core';
import { InitializeComponent } from './initialize/initialize.component';
import { SorterComponent } from './sorter/sorter.component';
import { ValuesService, Value } from './values.service';
import { CommonModule } from '@angular/common';
import { SortStepService, StepData } from './sorter/sort-step.service';
import { FinishedComponent } from './finished/finished.component';

export enum SorterState {
  Initializing,
  Sorting,
  Finished
}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, InitializeComponent, SorterComponent, FinishedComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  public values: Value[] = this.valuesService.values;
  public sorterState: SorterState = SorterState.Initializing;
  public get sorterStateEnum() { return SorterState; }
  useDebugValues:boolean = false;

  constructor(private valuesService: ValuesService, private sortStepService:SortStepService) 
  { 
    if (this.useDebugValues) {
      this.valuesService.values = [
        {value: "A"},
        {value: "B"},
        {value: "C"},
        {value: "D"},
        {value: "E"}
      ];

      this.sorterState = SorterState.Finished;
    }
  }

  onInitializeSubmit() {
    this.sortStepService.initializeData();
    this.sorterState = SorterState.Sorting;
  }

  onSorterFinish() {
    this.sorterState = SorterState.Finished;
  }

  onFinishedStartOver() {
    this.sorterState = SorterState.Initializing;
  }
}
