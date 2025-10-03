import { Component, ViewChildren, QueryList, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import {MotionPathPlugin} from "gsap/MotionPathPlugin";
import gsap from 'gsap';
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit{
@ViewChildren('hb') headingBlocks!: QueryList<ElementRef>;
@ViewChildren('bt') buttonBlocks!: QueryList<ElementRef>;
@ViewChild('satellite') satellite!: ElementRef;

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
    from(buttonBlockElements, { y: 100, opacity: 0, duration: 1, stagger: 0.5, ease: "power2.out", delay:"=+0"}).
    from("#satellite", {
  duration: 2,
  ease: "power3.inOut",
  motionPath: {
    path: [{x: -100, y: 0}, {x: 300, y: -150}, {x: 600, y: 0}],
    curviness: 1.25
  },
  delay:"=+0"
});
 gsap.to("#satellite", {
  y: 30,
  repeat: -1,
  ease: "sine.inOut",
  yoyo: true,
  duration: 2
});

  };

}
