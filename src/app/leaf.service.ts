import { Injectable, InjectionToken } from '@angular/core';

export const LeafToken = new InjectionToken('leaf service token');

export const LeafValue = 'daun bawang';

@Injectable({
  providedIn: 'root'
})
export class LeafService {
  value = 'daun service';
}