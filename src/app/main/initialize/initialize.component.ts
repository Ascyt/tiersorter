import { Component, HostListener, EventEmitter, Output, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValuesService, Value } from '../values.service';
import { ValueInputComponent } from './value-input/value-input.component';
import { SortStepService } from '../sorter/sort-step.service';
import { NgbAlert, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-initialize',
  standalone: true,
  imports: [CommonModule, ValueInputComponent, NgbModule],
  templateUrl: './initialize.component.html',
  styleUrl: './initialize.component.scss'
})
export class InitializeComponent {
  @Output() public startSorter = new EventEmitter();  
  @ViewChildren(ValueInputComponent) valueInputs: QueryList<ValueInputComponent> = new QueryList();

  public showNotEnoughValuesAlert = false;

  public get values(): Value[] {
    // exclude last
    return this.valuesService.values.slice(0, -1);
  }

  constructor(public valuesService: ValuesService, public sortStepService:SortStepService) {
    valuesService.values.push(valuesService.getNewValue());
   }

  public addValue(event:KeyboardEvent|undefined = undefined): void {
    if (event !== undefined) {
      event.preventDefault();
    }

    this.focusElement(this.valuesService.values.length - 1);
    this.valuesService.values.push(this.valuesService.getNewValue());
  }
  @HostListener('document:keydown.enter', ['$event']) 
  public addValueEnter(event:KeyboardEvent|undefined = undefined): void {
    const input = this.valueInputs.toArray()[this.valuesService.values.length - 1];
    if (input !== undefined) {
      input.disableGreyedOut();
    }
  }
  @HostListener('document:keydown.shift.enter', ['$event'])
  public removeLastValue(event:KeyboardEvent|undefined = undefined): void {
    if (event !== undefined) {
      event.preventDefault();
    }

    this.valuesService.values.splice(this.valuesService.values.length - 2, 1);

    this.focusLastElement();
  }

  @HostListener('document:keydown.home', ['$event'])
  public focusFirstElement(event:KeyboardEvent|undefined = undefined): void {
    this.focusElement(0);
  }

  @HostListener('document:keydown.end', ['$event'])
  public focusLastElement(event:KeyboardEvent|undefined = undefined): void {
    this.focusElement(this.valuesService.values.length - 2);
  }

  public focusElement(index: number): void {
    const input = this.valueInputs.toArray()[index];
    if (input !== undefined) {
      input.focus();
    }
  }
  

  public removeValue(index: number): void {
    this.values.splice(index, 1);
  }

  @HostListener('document:keydown.control.enter', ['$event'])
  public onSubmit(event:KeyboardEvent|undefined = undefined): void {
    if (this.values.length < 2) {
      this.showNotEnoughValuesAlert = true;
      return;
    }

    this.valuesService.values = this.values;

    // Shuffle array
    for (let i = this.valuesService.values.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.valuesService.values[i], this.valuesService.values[j]] = [this.valuesService.values[j], this.valuesService.values[i]];
    }

    this.startSorter.emit();
  }

  @HostListener('document:keydown.control.s', ['$event'])
  downloadJson(event:KeyboardEvent|undefined = undefined):void {
    if (event !== undefined) {
      event.preventDefault();
    }

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.values));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "tiersorter-items.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  @HostListener('document:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'o') {
      event.preventDefault(); // Prevent the default browser behavior (e.g., open file dialog)
      const fileInput = document.getElementById('json-upload') as HTMLInputElement;
      fileInput.click();
    }
  }
  uploadJson(event: Event):void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file === undefined) 
    {
      console.error('No file selected');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      try {
        const values = JSON.parse(text);
        if (Array.isArray(values)) {
          this.valuesService.values = values;
        }
        else {
          console.error('Invalid JSON file');
        }
      } catch (e) {
        console.error(e);
      }
    };
    reader.readAsText(file);
  }
}
