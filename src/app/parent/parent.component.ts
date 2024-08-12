import { Component, Inject, SkipSelf } from '@angular/core';
import { LeafToken, LeafService} from '../leaf.service';

import { ChildComponent } from '../child/child.component';
@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
  viewProviders: [ {provide: LeafService, useValue: {value: 'daun parent'}}],
  // providers: [ {provide: LeafService, useValue: {value: 'daun parent'}}],
  // viewProviders: [{provide: LeafToken, useValue: 'daun parent tapi viewProviders'}]
})
export class ParentComponent {
  daun: string;
  constructor(@SkipSelf() private leaf: LeafService) {
    this.daun = leaf.value;
  }
}
