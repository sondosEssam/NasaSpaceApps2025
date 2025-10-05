import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.html',
  styleUrls: ['./nav-bar.css'],
  imports: [RouterLink]
})
export class NavBar {
  @ViewChild('menuBtn') menuBtn!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;
  
  isMenuOpen = false;

  ontoggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}