import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValuesService, Value } from '../values.service';
import { ValueInputComponent } from './value-input/value-input.component';

@Component({
  selector: 'app-initialize',
  standalone: true,
  imports: [CommonModule, ValueInputComponent, ],
  templateUrl: './initialize.component.html',
  styleUrl: './initialize.component.scss'
})
export class InitializeComponent {
  @Output() public startSorter = new EventEmitter();  
  public get values(): Value[] {
    return this.valuesService.values;
  }

  constructor(private valuesService: ValuesService) { }

  public addValue(): void {
    this.values.push(this.valuesService.getNewValue());
  }

  public removeValue(index: number): void {
    this.values.splice(index, 1);
  }

  public onSubmit(): void {
    this.startSorter.emit();
  }

  downloadJson():void {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.values));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "values.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
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
