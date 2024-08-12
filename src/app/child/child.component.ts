import { Component, Inject } from '@angular/core';
import { LeafToken, LeafService } from '../leaf.service';
@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss'
})
export class ChildComponent {
  constructor(private leaf: LeafService) {
    this.daun = leaf.value;
  }
  daun: string;
}
