import { Component } from '@angular/core';
import { InitializeComponent } from './initialize/initialize.component';
import { SorterComponent } from './sorter/sorter.component';
import { ValuesService, Value } from './values.service';
import { CommonModule } from '@angular/common';
import { SortStepService, StepData } from './sorter/sort-step.service';

export enum SorterState {
  Initializing,
  Sorting,
  Sorted
}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, InitializeComponent, SorterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  public values: Value[] = this.valuesService.values;
  public sorterState: SorterState = SorterState.Initializing;
  public get sorterStateEnum() { return SorterState; }

  constructor(private valuesService: ValuesService, private sortStepService:SortStepService) { }

  onInitializeSubmit() {
    this.sortStepService.initializeData();
    this.sorterState = SorterState.Sorting;
  }
}
