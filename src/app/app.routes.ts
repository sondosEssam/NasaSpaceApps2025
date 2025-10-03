import { Routes } from '@angular/router';

export const routes: Routes = [

    {path:'', loadComponent: () => import('./components/home/home').then(m => m.Home)},
    {path:'pollution', loadComponent: () => import('./components/pollution/pollution').then(m => m.Pollution)},
    {path:'about', loadComponent: () => import('./components/about/about').then(m => m.About)},
    {path:'forecast',loadComponent:()=>import('./components/forecast/forecast').then(m=>m.Forecast)},
    {path:'**', redirectTo:''}
];
