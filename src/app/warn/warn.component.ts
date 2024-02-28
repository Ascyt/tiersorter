import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-warn',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './warn.component.html',
  styleUrl: './warn.component.scss'
})
export class WarnComponent {

}
