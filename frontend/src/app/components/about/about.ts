import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class About implements OnInit {
  
  pollutionData: any;
  weatherData: any;
  
  resources = [
    {
      title: 'World Health Organization',
      description: 'Global air pollution information, health effects, and mitigation strategies.',
      icon: 'fas fa-globe',
      link: 'https://www.who.int/health-topics/air-pollution',
      bgColor: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-600'
    },
    {
      title: 'NASA TEMPO',
      description: 'Tropospheric Emissions: Monitoring of Pollution air quality observation data.',
      icon: 'fas fa-satellite',
      link: 'https://tempo.si.edu/',
      bgColor: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-600'
    },
    {
      title: 'NASA WorldView',
      description: 'Interactive browsing of 1000+ global satellite imagery layers.',
      icon: 'fas fa-map',
      link: 'https://worldview.earthdata.nasa.gov/',
      bgColor: 'from-green-500 to-green-600',
      textColor: 'text-green-600'
    },
    {
      title: 'AirNow',
      description: 'Real-time air quality maps and data from EPA, NOAA, and NASA.',
      icon: 'fas fa-map-marker-alt',
      link: 'https://www.airnow.gov/',
      bgColor: 'from-orange-500 to-orange-600',
      textColor: 'text-orange-600'
    },
    {
      title: 'OpenAQ',
      description: 'Open community platform for historic and real-time air quality measurements.',
      icon: 'fas fa-database',
      link: 'https://openaq.org/',
      bgColor: 'from-teal-500 to-teal-600',
      textColor: 'text-teal-600'
    },
    {
      title: 'NASA Earthdata Search',
      description: 'Map-based search for spatiotemporal queries and data download.',
      icon: 'fas fa-search',
      link: 'https://search.earthdata.nasa.gov/',
      bgColor: 'from-indigo-500 to-indigo-600',
      textColor: 'text-indigo-600'
    }
  ];

  educationalResources = [
    {
      title: '60 Second Science: Air Quality',
      description: 'Quick overview of what air quality is and why it\'s important to study.',
      icon: 'fas fa-play-circle',
      iconColor: 'text-red-600',
      duration: '~1 minute',
      type: 'Educational Video'
    },
    {
      title: 'NASA Air Pollution Webinar',
      description: 'Two-part webinar series on accessing and visualizing NASA air pollution data.',
      icon: 'fas fa-video',
      iconColor: 'text-blue-600',
      duration: 'Multi-part series',
      type: 'Intermediate'
    },
    {
      title: 'ASDC Resource Hub',
      description: 'Comprehensive tutorials and guidance for accessing atmospheric data.',
      icon: 'fas fa-book',
      iconColor: 'text-green-600',
      duration: 'Tutorials & Guides',
      type: 'RSIG-py required'
    }
  ];

  internationalPartners = [
    {
      title: 'Canadian Space Agency',
      description: 'OSIRIS optical spectrograph measuring atmospheric composition since 2001.',
      icon: 'fas fa-leaf',
      bgColor: 'bg-red-600',
      focus: 'Upper atmosphere (7-90 km)',
      measurements: 'Ozone, aerosols, NO₂'
    },
    {
      title: 'Brazilian Space Agency',
      description: 'SEEG greenhouse gas emissions system and CPTEC weather forecasting.',
      icon: 'fas fa-globe-americas',
      bgColor: 'bg-green-600',
      focus: 'SEEG: GHG emissions tracking',
      measurements: 'CPTEC: Weather & climate modeling'
    },
    {
      title: 'Global Networks',
      description: 'International ground station networks providing continuous monitoring.',
      icon: 'fas fa-network-wired',
      bgColor: 'bg-blue-600',
      focus: 'Pandora: 168 official sites',
      measurements: 'TOLNet: 12 ozone monitoring sites'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.initializeCharts();
  }

  initializeCharts(): void {
    // Sample data from the JSON file
    this.pollutionData = {
      labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00'],
      datasets: [
        {
          label: 'BCEXTTAU',
          data: [0.0072103436104953, 0.0071492488496005, 0.0072023081593215, 0.0073282490484416, 0.0074839703738689, 0.0076295430772006, 0.0077159833163022, 0.0075310510583221, 0.0073117706924676, 0.0069903442636132, 0.0071189748123288, 0.0073887426406145, 0.0089124757796525],
          borderColor: '#EF4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.4
        },
        {
          label: 'DUEXTTAU',
          data: [0.0813940539956092, 0.080231674015522, 0.0817871019244194, 0.0847483053803443, 0.0881009697914123, 0.0925207957625389, 0.0999052822589874, 0.1098846793174743, 0.121662400662899, 0.1101577430963516, 0.1103099808096885, 0.1144596561789512, 0.199666142463684],
          borderColor: '#F97316',
          backgroundColor: 'rgba(249, 115, 22, 0.1)',
          tension: 0.4
        },
        {
          label: 'OCEXTTAU',
          data: [0.0147739816457033, 0.0146776251494884, 0.0144527358934283, 0.0142515767365694, 0.0141930188983678, 0.0139557868242263, 0.0129273608326911, 0.0111101968213915, 0.0102231316268444, 0.0094895930960774, 0.010072655044496, 0.0118250222876667, 0.0172238238155841],
          borderColor: '#EAB308',
          backgroundColor: 'rgba(234, 179, 8, 0.1)',
          tension: 0.4
        },
        {
          label: 'SUEXTTAU',
          data: [0.1332751959562301, 0.1338189244270324, 0.1351257413625717, 0.140373408794403, 0.1434220075607299, 0.1408571004867553, 0.1409473717212677, 0.1356498450040817, 0.133541464805603, 0.1238358169794082, 0.1239500641822815, 0.1281373500823974, 0.1946911066770553],
          borderColor: '#8B5CF6',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          tension: 0.4
        }
      ]
    };

    this.weatherData = {
      labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00'],
      datasets: [
        {
          label: 'Temperature (K)',
          data: [285.98, 286.31, 286.46, 286.53, 286.53, 287.40, 289.30, 291.81, 293.43, 294.38, 295.00, 295.09, 294.54],
          borderColor: '#DC2626',
          backgroundColor: 'rgba(220, 38, 38, 0.1)',
          tension: 0.4,
          yAxisID: 'y'
        },
        {
          label: 'Humidity',
          data: [0.0076622362248599, 0.0077406452037394, 0.0078569455072283, 0.0079946964979171, 0.0081286253407597, 0.0082777775824069, 0.0084386318922042, 0.0080969082191586, 0.0076937209814786, 0.0075084352865815, 0.0073671899735927, 0.0072486377321183, 0.0071924552321434],
          borderColor: '#2563EB',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          tension: 0.4,
          yAxisID: 'y1'
        }
      ]
    };
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openResource(link: string): void {
    window.open(link, '_blank');
  }
}