import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-splash',
  imports: [],
  templateUrl: './splash.html',
  styleUrls: ['./splash.css']
})
export class Splash implements AfterViewInit {
  @ViewChild('svg') svg!: ElementRef<SVGPathElement>;
  @ViewChild('logo') logo!: ElementRef<HTMLDivElement>;
  @ViewChild('con') con!: ElementRef<HTMLDivElement>;
  @Input() text!: string;
  @Output() finished = new EventEmitter<string>();

  ngAfterViewInit(): void {
    const path = this.svg.nativeElement;
    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length
    });

    // Master timeline
    let master = gsap.timeline();

    // Draw animation (faster)
    master.to(path, {
      duration: 1, // was 2
      strokeDashoffset: 0,
      ease: "power2.inOut"
    });

    // Floating loop (unchanged but quicker motion)
    gsap.to(path, {
      scale: 1.05,
      y: 10,
      duration: 0.6, // was 1
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });

    // Fade in text (faster)
    master.to(this.logo.nativeElement, {
      opacity: 1,
      duration: 0.3, // was 0.5
      ease: "power1.inOut"
    }, "<");

    // Shadow breathing loop (slightly faster pulse)
    gsap.to(this.logo.nativeElement, {
      textShadow: "0px 0px 30px rgba(255, 255, 255, 1)",
      duration: 0.6, // was 1
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });

    // Shorter wait
    master.to({}, { duration: 0.5 }); // was 1

    // EXIT animations (faster)
    master.to(path, {
      x: window.innerWidth * 3,
      duration: 0.6, // was 1
      ease: "power3.in",
      delay: 1 // was 2
    });

    master.to(this.logo.nativeElement, {
      opacity: 0,
      y: 10,
      ease: "sine.inOut",
      delay: 0.3 // was 0.5
    });

    master.to(this.con.nativeElement, {
      opacity: 0,
      duration: 0.6, // was 1
      ease: "power1.out",
      onComplete: () => {
        gsap.set(this.con.nativeElement, { display: "none" });
      }
    });
  }
}
