import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Splash } from "./components/splash/splash";
import { Particles } from "./shared/particles/particles";
import { Home } from "./components/home/home";
import { NavBar } from "./components/nav-bar/nav-bar";
import { Footer } from "./components/footer/footer";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Splash, Particles, NavBar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  showSplash = true;
  ngOnInit() {
  setTimeout(() => this.showSplash = false, 4000); // hide after 3s
}
  protected readonly title = signal('NasaSpaceApps2025');
}
