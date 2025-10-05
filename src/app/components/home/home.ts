import { Component, ViewChildren, QueryList, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import {MotionPathPlugin} from "gsap/MotionPathPlugin";
import gsap from 'gsap';
import { Details } from "./details/details";
import { LogarithmicScale } from 'chart.js';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-home',
  imports: [Details, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit{
@ViewChildren('hb') headingBlocks!: QueryList<ElementRef>;
@ViewChildren('bt') buttonBlocks!: QueryList<ElementRef>;
@ViewChild('satellite') satellite!: ElementRef;
@ViewChild('about') about!: ElementRef;
 getNatives(headingBlocks: any): HTMLElement[] {
  return headingBlocks.map((ref: any) => ref.nativeElement);
}
    ngOnInit(){
    }

ngAfterViewInit() {

    let timeline = gsap.timeline();
    let headingBlockElements = this.getNatives(this.headingBlocks);
    let buttonBlockElements = this.getNatives(this.buttonBlocks);
    gsap.registerPlugin(MotionPathPlugin);

    timeline.from(headingBlockElements, { x: -300, duration: 1, stagger: 0.5, ease: "power2.out",  }).
    from(buttonBlockElements, { y: 100, opacity: 0, duration: 1, stagger: 0.5, ease: "power2.inout"}).
    from("#satellite", {
  duration: 2,
  ease: "power3.inOut",
  motionPath: {
    path: [{x: -100, y: 0}, {x: 300, y: -150}, {x: 600, y: 0}],
    curviness: 1.25
  },

});
 gsap.to("#satellite", {
  y: 50,
  repeat: -1,
  ease: "sine.inOut",
  yoyo: true,
  duration: 2
});

  };
//scrolling 
scrollToAbout(){
  const el = this.about.nativeElement as HTMLElement;
  console.log(el);
  
  const top = el.offsetTop; //start positoin
  el.scrollIntoView({behavior:'smooth'});


}
}
