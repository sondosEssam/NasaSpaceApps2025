import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Splash } from "./components/splash/splash";
import { Particles } from "./shared/particles/particles";
import { Home } from "./components/home/home";
import { NavBar } from "./components/nav-bar/nav-bar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Splash, Particles, Home, NavBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('NasaSpaceApps2025');
}
