import { Component, EventEmitter, Output } from '@angular/core';
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

  public startOverClicked(): void {
    this.startOver.emit();
  }
}
