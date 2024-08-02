import { Component, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-foo',
  standalone: true,
  imports: [],
  templateUrl: './foo.component.html',
  styleUrl: './foo.component.scss'
})
export class FooComponent implements AfterViewInit, OnDestroy {
  constructor() {
    console.log('Foo constructor()')
  }
  ngAfterViewInit(): void {
    console.log('Foo AfterViewInit()')
  }
  ngOnDestroy(): void {
    console.log('Foo OnDestroy()')
  }
}
