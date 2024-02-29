import { Injectable } from '@angular/core';
import { Value, ValuesService } from '../values.service';

export interface StepData {
  currentValues: Value[];
  size: number;
  position: number;
  temporaryValues: Value[];
  leftHalf: Value[];
  rightHalf: Value[];
}

@Injectable({
  providedIn: 'root'
})
export class SortStepService {
  private stepData: StepData|undefined;
  public currentDecision: (Value|undefined)[] = [undefined, undefined]; // always length 2
  public decisionsMadeStack: StepData[] = [];

  constructor(private valuesService:ValuesService) { }

  public get decisionsMade(): number {
    return this.decisionsMadeStack.length;
  }

  public getDecisionsNeeded(n:number): number {
    return n * Math.ceil(Math.log2(n)) - Math.pow(2, Math.ceil(Math.log2(n))) + 1;
  }

  public get decisionsNeeded(): number {
    const n = this.valuesService.values.length;
    return this.getDecisionsNeeded(n);
  }

  initializeData():void {
    this.stepData = {
      currentValues: this.valuesService.values.map(value => ({ ...value })),
      size: 1,
      position: 0,
      temporaryValues: [],
      leftHalf: [this.valuesService.values[0]],
      rightHalf: [this.valuesService.values[1]]
    };

    this.currentDecision = this.getDecision();
    this.decisionsMadeStack = [];
  }

  // Always returns Value[] of length 2
  getDecision(): (Value|undefined)[] {
    if (this.stepData === undefined)
      throw new Error('stepData is not set');

    return [this.stepData.leftHalf[0], this.stepData.rightHalf[0]];
  }

  // Returns true if the sort is complete
  sortSingleStep(useLeft: boolean): boolean {
    if (this.stepData === undefined)
      throw new Error('stepData is not set');

    this.decisionsMadeStack.push({
      currentValues: this.stepData.currentValues.map(value => ({ ...value })),
      size: this.stepData.size,
      position: this.stepData.position,
      temporaryValues: this.stepData.temporaryValues.map(value => ({ ...value })),
      leftHalf: this.stepData.leftHalf.map(value => ({ ...value })),
      rightHalf: this.stepData.rightHalf.map(value => ({ ...value }))
    });
    const stepData:StepData = this.stepData;
    
    if (useLeft) {
      stepData.temporaryValues.push(stepData.leftHalf.splice(0, 1)[0]);
    } else {
      stepData.temporaryValues.push(stepData.rightHalf.splice(0, 1)[0]);
    }

    let nextStep:boolean = false;
    if (stepData.leftHalf.length === 0) {
      stepData.temporaryValues = stepData.temporaryValues.concat(stepData.rightHalf);
      stepData.rightHalf = [];
      nextStep = true;
    }
    if (stepData.rightHalf.length === 0) {
      stepData.temporaryValues = stepData.temporaryValues.concat(stepData.leftHalf);
      stepData.leftHalf = [];
      nextStep = true;
    }

    if (nextStep) {
      stepData.currentValues.splice(stepData.position, stepData.temporaryValues.length, ...stepData.temporaryValues);
      stepData.position += stepData.temporaryValues.length;
      stepData.temporaryValues = [];
    
      if (stepData.position >= stepData.currentValues.length - stepData.size) {
        stepData.size *= 2;
        stepData.position = 0;
      }

      if (stepData.size >= stepData.currentValues.length) {
        this.valuesService.values = stepData.currentValues;
        this.stepData = undefined;
        return true;
      }

      stepData.leftHalf = stepData.currentValues.slice(stepData.position, stepData.position + stepData.size);
      stepData.rightHalf = stepData.currentValues.slice(stepData.position + stepData.size, stepData.position + stepData.size * 2);
    }

    this.stepData = stepData;
    return false;
  }

  // Reverses the last sort step
  previousStep(): void {
    if (this.stepData === undefined)
      throw new Error('stepData is not set');

    if (this.decisionsMadeStack.length === 0)
      return;
      
    this.stepData = this.decisionsMadeStack.pop();
  }
}
