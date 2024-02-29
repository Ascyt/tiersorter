import { Component, EventEmitter, Output, HostListener } from '@angular/core';
import { DefaultValueListComponent } from './default-value-list/default-value-list.component';

@Component({
  selector: 'app-finished',
  standalone: true,
  imports: [DefaultValueListComponent],
  templateUrl: './finished.component.html',
  styleUrl: './finished.component.scss'
})
export class FinishedComponent {
  @Output() public startOver = new EventEmitter();

  @HostListener('document:keydown.enter', ['$event'])
  public startOverClicked(event:KeyboardEvent|undefined = undefined): void {
    this.startOver.emit();
  }
}
