import { Injectable } from '@angular/core';
import { Value, ValuesService } from '../values.service';

export interface StepData {
  currentValues: Value[];
  size: number;
  position: number;
  temporaryValues?: Value[]; 
  firstHalfIndex?: number;
  // secondHalfIndex includes middle index
  secondHalfIndex?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SortStepService {
  private stepData: StepData|undefined;
  public currentDecision: (Value|undefined)[] = [undefined, undefined]; // always length 2

  constructor(private valuesService:ValuesService) { }

  initializeData():void {
    this.stepData = {
      currentValues: this.valuesService.values.map(value => ({ ...value })),
      size: 1,
      position: 0
    };

    this.currentDecision = this.getDecision();
  }

  // Always returns Value[] of length 2
  getDecision(): (Value|undefined)[] {
    if (!this.stepData)
      throw new Error('stepData is not set');

    const middle:number = Math.floor(this.stepData.currentValues.length / 2);
    const leftIndex:number = this.stepData.position + (this.stepData.firstHalfIndex || 0);
    const rightIndex:number = this.stepData.position + (this.stepData.secondHalfIndex || middle);

    return [this.stepData.currentValues[leftIndex], this.stepData.currentValues[rightIndex]];
  }

  // Returns true if the sort is complete
  sortSingleStep(useLeft: boolean): Boolean {
    if (!this.stepData)
      throw new Error('stepData is not set');

    const middle:number = Math.floor(this.stepData.currentValues.length / 2);
    const leftIndex:number = this.stepData.position + (this.stepData.firstHalfIndex || 0);
    const rightIndex:number = this.stepData.position + (this.stepData.secondHalfIndex || middle);
    const leftValue:Value = this.stepData.currentValues[leftIndex];
    const rightValue:Value = this.stepData.currentValues[rightIndex];

    if (!this.stepData.temporaryValues) {
      this.stepData.temporaryValues = [];
      this.stepData.firstHalfIndex = 0;
      this.stepData.secondHalfIndex = middle;
    }

    if (!this.stepData.firstHalfIndex)
      throw new Error('firstHalfIndex is not set');
    if (!this.stepData.secondHalfIndex)
      throw new Error('secondHalfIndex is not set');

    if (useLeft) {
      this.stepData.temporaryValues.push(leftValue);
      this.stepData.firstHalfIndex += 1;
    } else {
      this.stepData.temporaryValues.push(rightValue);
      this.stepData.secondHalfIndex += 1;
    }

    if (this.stepData.firstHalfIndex > middle || this.stepData.secondHalfIndex >= this.stepData.currentValues.length) {
      // Remove the rest
      const startIndex:number = this.stepData.firstHalfIndex > middle ? rightIndex : leftIndex;
      const endIndex:number = this.stepData.firstHalfIndex > middle ? this.stepData.currentValues.length - 1 : middle - 1;
      for (let i = startIndex; i <= endIndex; i++) {
        this.stepData.temporaryValues.push(this.stepData.currentValues[i]);
      }

      // Copy temporaryValues to currentValues
      for (let i = 0; i < this.stepData.temporaryValues.length; i++) {
        this.stepData.currentValues[this.stepData.position + i] = this.stepData.temporaryValues[i];
      }

      this.stepData.temporaryValues = undefined;
      this.stepData.firstHalfIndex = undefined;
      this.stepData.secondHalfIndex = undefined;
      this.stepData.position += this.stepData.size * 2;
      if (this.stepData.position >= this.stepData.currentValues.length) {
        this.stepData.size *= 2;
        this.stepData.position = 0;
      }
    }
    
    return this.stepData.size >= this.stepData.currentValues.length;
  }
}
