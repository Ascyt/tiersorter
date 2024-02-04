import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterModule, RouterLinkActive } from '@angular/router';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeSwitcherService } from './theme-switcher/theme-switcher.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ThemeSwitcherComponent, RouterModule, RouterLinkActive, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(public router:Router, private themeSwitcher:ThemeSwitcherService) {
    this.updateTheme();
  }

  toggleTheme() {
    this.updateTheme();
  }
  updateTheme() {
    switch (this.themeSwitcher.themeSwitchCounter) { // ignore this
      case 10:
        alert('bro stop')
        break;
      case 20:
        alert('seriously')
        break;
      case 30:
        alert('stop it')
        break;
      case 40:
        alert('you\'re gonna break it')
        break;
      case 50:
        document.body.className = 'what'
        alert('great. you broke it.')
        return;
      case 60:
        alert('it\'s broken')
        return;
      case 70:
        alert('it\'s still broken')
        return;
      case 80:
        alert('it\'s no use man. it\'s broken')
        return;
      case 90:
        alert('you\'re still here?')
        return;
      case 100:
        alert('fine. you win. i\'ll fix it.')
        this.themeSwitcher.themeSwitchCounter = 0;
        break;
    } if (this.themeSwitcher.themeSwitchCounter > 50) return;


    document.body.className = this.themeSwitcher.isLightTheme ? 'light-theme' : 'dark-theme';
  }
}
