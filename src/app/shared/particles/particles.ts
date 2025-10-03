import { Component } from '@angular/core';
import {NgxParticlesModule, NgParticlesService} from "@tsparticles/angular";
import { loadSlim } from '@tsparticles/slim';
import { Container, MoveDirection, OutMode,  } from '@tsparticles/engine';


@Component({
  selector: 'app-particles',
  imports: [NgxParticlesModule],
  templateUrl: './particles.html',
  styleUrl: './particles.css'
})
export class Particles {
 id = "tsparticles";

particlesOptions = {

    background: {
      color: { value: "#fff" },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        resize:{
          enable: true,
        }
      },
    },
    particles: {
      color: { value: ["#000", "#000"], animation: { enable: true, speed: 20, sync: true } },
      links: {
        color: "#6C757D",
        distance: 50,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: { default: OutMode.bounce },
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: { enable: true, area: 800 },
        value: 100,
      },
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 5 } },
      
    },
     detectRetina: false,
  
  };

constructor(private particlesService: NgParticlesService) {
    this.particlesService.init(async (engine) => {
      await loadSlim(engine);
    }); 
  }
    particlesLoaded(container: Container): void {
    console.log(container);
  }

}
