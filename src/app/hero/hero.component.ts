import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { trigger, style, state, transition, animate, query, stagger, AnimationEvent, keyframes, group } from '@angular/animations';
import { NgFor } from '@angular/common';

import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('.hero', [
          style({opacity: 0, transform: 'translateY(-100px)'}),
          stagger(700, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({opacity: 1, transform: 'none'})),
          ]),
        ]),
      ]),
    ]),
    trigger('inOut', [
      state('in', style({transform: 'translateX(0)'})),
      state('out', style({transform: 'translateX(100%)'})),
      // transition(':enter', [style({transform: 'translateX(-100%)'}), animate(300)]),
      transition(':leave', [animate('300ms ease-out', keyframes([
        style({transform: 'translateX(-10%)', offset: 0.2}),
        style({transform: 'translateX(100%)', offset: 1}),
      ]))]),
    ]),
    trigger('shrinkOut', [
      transition(':leave', [
        style({height: '*', width: '*'}),
        animate(200, style({height: 0, width: 0}))
      ]),
      transition(':enter', [
        style({height: 0, width: 0}),
        animate(200)
      ])
    ]),
    trigger('flyInOut', [
      state(
        'in',
        style({
          width: '*',
          transform: 'translateX(0)',
          opacity: 1,
        }),
      ),
      transition(':enter', [
        style({width: 10, transform: 'translateX(50px)', opacity: 0}),
        group([
          animate(
            '.8s .3s ease',
            style({
              transform: 'translateX(0)',
              width: '*',
            }),
          ),
          animate(
            '.5s .1s ease',
            style({
              opacity: 1,
            }),
          ),
        ]),
      ]),
      transition(':leave', [
        group([
          animate(
            '0.8s ease',
            style({
              transform: 'translateX(50px)',
              width: 10,
            }),
          ),
          animate(
            '0.3s 0.2s ease',
            style({
              opacity: 0,
            }),
          ),
        ]),
      ]),
    ]),
    trigger('filterAnimation', [
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(
          ':enter',
          [
            style({opacity: 0, width: 0}),
            stagger(50, [animate('300ms ease-out', style({opacity: 1, width: '*'}))]),
          ],
          {optional: true}
        ),
      ]),
      transition(':decrement', [
        query(':leave', [stagger(500, [animate('2000ms ease-out', style({opacity: 0, width: 0}))])])
      ])
    ]),
  ],
})
export class HeroComponent implements AfterViewInit {
  
  ngAfterViewInit(): void {
    console.log('this', this);
    this._heroes = [...this.heroes];
  }
  
  isShrink = false;
  toggleShrink() {
    this.isShrink = !this.isShrink;
  }
  
  disableAnimation = false;
  toggleAnimation() {
    this.disableAnimation = !this.disableAnimation;
  }
  inputHero: string = '';
  heroes: {id: string; name: string}[] = [{id: uuid(), name: 'Ilham'}, {id: uuid(), name: 'Ilsung'}, {id: uuid(), name: 'Salsa'}, {id: uuid(), name: 'Sabinor'}, {id: uuid(), name: 'Sodomi'}, {id: uuid(), name: 'Idih'}, {id: uuid(), name: 'Ikram'}];
  _heroes: {id: string; name: string}[] = [];
  heroesTotal = -1;

  updateCriteria(criteria: string) {
    criteria = criteria ? criteria.trim() : '';

    this.heroes = this._heroes.filter((hero) =>  hero.name.toLowerCase().includes(criteria.toLowerCase()))

    const newTotal = this.heroes.length;

    if (this.heroesTotal !== newTotal) {
      this.heroesTotal = newTotal;
    } else if (!criteria) {
      this.heroesTotal = -1;
    }
  }

  resetHeroes() {
    this.heroes = [...this._heroes];
  }

  addHero() {
    this.heroes = [...this.heroes, {id: uuid(), name: this.inputHero}];
    this.inputHero = '';
    this._heroes = [...this.heroes];
  }
  deleteHero(index: number) {
    const newHeroes1 = this.heroes.slice(0, index);
    const newHeroes2 = this.heroes.slice(index+1);
    this.heroes = newHeroes1.concat(newHeroes2);
    this._heroes = [...this.heroes];
  }

  onAnimationEvent(event: AnimationEvent) {
    console.log('event', event)
  }
}
