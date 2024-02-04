import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class ThemeSwitcherService {
    public isLightTheme: boolean = false;
    public themeSwitchCounter: number = 0;
    public closeButtonStyle: string = "btn-close";

    constructor() {
        this.updateTheme();
    }

    toggleTheme() {
        this.isLightTheme = !this.isLightTheme;
        this.themeSwitchCounter++;
    
        this.updateTheme();
    }

    updateTheme() {
        this.closeButtonStyle = this.isLightTheme ? "btn-close btn-close-black" : "btn-close btn-close-white";
    }
}