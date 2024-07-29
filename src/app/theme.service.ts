import { Injectable, signal } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themeSignal = signal<'light'|'dark'>('light')

  toggleTheme() {
    this.themeSignal.update(value => value === 'light' ? 'dark' : 'light')
  }
}
