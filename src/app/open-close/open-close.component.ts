import { Component } from '@angular/core';
import { trigger, transition, state, animate, style, AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-open-close',
  standalone: true,
  imports: [],
  templateUrl: './open-close.component.html',
  styleUrl: './open-close.component.scss',
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          height: '200px', 
          opacity: 1, 
          backgroundColor: 'yellow'
        })
      ),
      state(
        'closed',
        style({
          height: '100px',
          opacity: 0.8,
          backgroundColor: 'skyblue'
        })
      ),
      // transition('* => closed', [animate('.3s ease-out')]),
      // transition('* => open', [animate('0.3s ease-out')]),
      transition('closed <=> open', [animate('0.3s ease-out')]),
    ])
  ],
})
export class OpenCloseComponent {
  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen
  }

  onAnimationEvent(event: AnimationEvent) {
  // openClose is trigger name in this example
  console.warn(`Animation Trigger: ${event.triggerName}`);
  // phaseName is "start" or "done"
  console.warn(`Phase: ${event.phaseName}`);
  // in our example, totalTime is 1000 (number of milliseconds in a second)
  console.warn(`Total time: ${event.totalTime}`);
  // in our example, fromState is either "open" or "closed"
  console.warn(`From: ${event.fromState}`);
  // in our example, toState either "open" or "closed"
  console.warn(`To: ${event.toState}`);
  // the HTML element itself, the button in this case
  console.warn(`Element: ${event.element}`);
  
}
}
