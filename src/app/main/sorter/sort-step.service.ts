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
    if (this.stepData === undefined)
      throw new Error('stepData is not set');

    const middle:number = Math.min(this.stepData.size, Math.floor((this.stepData.currentValues.length - this.stepData.position) / 2));
    const leftIndex:number = this.stepData.position + (this.stepData.firstHalfIndex ?? 0);
    const rightIndex:number = this.stepData.position + (this.stepData.secondHalfIndex ?? middle);

    return [this.stepData.currentValues[leftIndex], this.stepData.currentValues[rightIndex]];
  }

  // Returns true if the sort is complete
  sortSingleStep(useLeft: boolean): boolean {
    if (this.stepData === undefined)
      throw new Error('stepData is not set');

    const stepData:StepData = {...this.stepData};
    
    console.log(this.stepData);

    const middle:number = Math.min(stepData.size, Math.floor((stepData.currentValues.length - stepData.position) / 2));
    const maxLength:number = Math.min(stepData.size * 2, stepData.currentValues.length - stepData.position);
    if (stepData.temporaryValues === undefined) {
      stepData.temporaryValues = [];
      stepData.firstHalfIndex = 0;
      stepData.secondHalfIndex = middle;
    }

    if (stepData.firstHalfIndex === undefined)
      throw new Error('firstHalfIndex is not set');
    if (stepData.secondHalfIndex === undefined)
      throw new Error('secondHalfIndex is not set');

    const leftIndex:number = stepData.position + stepData.firstHalfIndex;
    const rightIndex:number = stepData.position + stepData.secondHalfIndex;
    const leftValue:Value = stepData.currentValues[leftIndex];
    const rightValue:Value = stepData.currentValues[rightIndex];

    if (useLeft) {
      stepData.temporaryValues.push(leftValue);
      stepData.firstHalfIndex += 1;
    } else {
      stepData.temporaryValues.push(rightValue);
      stepData.secondHalfIndex += 1;
    }

    if (stepData.firstHalfIndex >= middle || stepData.secondHalfIndex >= maxLength) {
      // Remove the rest
      const startIndex:number = stepData.firstHalfIndex >= middle ? stepData.secondHalfIndex : stepData.firstHalfIndex;
      const endIndex:number = stepData.firstHalfIndex >= middle ? maxLength - 1 : middle - 1;
      for (let i = startIndex; i <= endIndex; i++) {
        stepData.temporaryValues.push(stepData.currentValues[stepData.position + i]);
      }

      // Copy temporaryValues to currentValues
      for (let i = 0; i < stepData.temporaryValues.length; i++) {
        stepData.currentValues[stepData.position + i] = stepData.temporaryValues[i];
      }

      stepData.temporaryValues = undefined;
      stepData.firstHalfIndex = undefined;
      stepData.secondHalfIndex = undefined;
      stepData.position += stepData.size * 2;
      if (stepData.position >= stepData.currentValues.length - stepData.size) {
        stepData.size *= 2;
        stepData.position = 0;
      }
    }
    
    this.stepData = stepData;

    console.log(stepData);

    return stepData.size >= stepData.currentValues.length;
  }
}
