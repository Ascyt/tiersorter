import { Component, HostListener, EventEmitter, Output, QueryList, ViewChildren, Host } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValuesService, Value } from '../values.service';
import { ValueInputComponent } from './value-input/value-input.component';

@Component({
  selector: 'app-initialize',
  standalone: true,
  imports: [CommonModule, ValueInputComponent],
  templateUrl: './initialize.component.html',
  styleUrl: './initialize.component.scss'
})
export class InitializeComponent {
  @Output() public startSorter = new EventEmitter();  
  @ViewChildren(ValueInputComponent) valueInputs: QueryList<ValueInputComponent> = new QueryList();

  public get values(): Value[] {
    return this.valuesService.values;
  }

  constructor(private valuesService: ValuesService) { }

  @HostListener('document:keydown.enter', ['$event'])
  public addValue(event:KeyboardEvent|undefined = undefined): void {
    if (event !== undefined) {
      event.preventDefault();
    }

    this.values.push(this.valuesService.getNewValue());

    setTimeout(() => {
      const lastInput = this.valueInputs.last;
      if (lastInput !== undefined) {
        lastInput.focus();
      }
      else {
        console.error('lastInput is undefined');
      }
    });
  }
  @HostListener('document:keydown.shift.enter', ['$event'])
  public removeLastValue(event:KeyboardEvent|undefined = undefined): void {
    if (event !== undefined) {
      event.preventDefault();
    }

    this.values.pop();

    this.focusElement(this.values.length - 1);
  }

  @HostListener('document:keydown.home', ['$event'])
  public focusFirstElement(event:KeyboardEvent|undefined = undefined): void {
    this.focusElement(0);
  }

  @HostListener('document:keydown.end', ['$event'])
  public focusLastElement(event:KeyboardEvent|undefined = undefined): void {
    this.focusElement(this.values.length - 1);
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

  public onSubmit(): void {
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
    downloadAnchorNode.setAttribute("download", "values.json");
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
