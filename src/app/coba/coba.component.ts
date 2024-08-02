import { Component, Input, AfterViewInit, OnDestroy, ViewContainerRef, ViewChild } from '@angular/core';
import { CobaService } from '../services/coba.service';

@Component({
  selector: 'app-coba',
  standalone: true,
  imports: [],
  templateUrl: './coba.component.html',
  styleUrl: './coba.component.scss'
})
export class CobaComponent implements AfterViewInit, OnDestroy {
  constructor(private vcr: ViewContainerRef, private cobaService: CobaService){
    console.log('CobaComponent constructor()')
  }
  @Input() name?: string | undefined = 'Default';

  @ViewChild('footer', {read: ViewContainerRef}) footer!: ViewContainerRef;
  
  ngAfterViewInit(): void {
    console.log('CobaComponent AfterViewInit()', this.cobaService.name)
    if (this.cobaService.name !== null) {
      this.cobaService.attachFooter(this.cobaService.name, this.footer)
    }
  }
  ngOnDestroy(): void {
    console.log('CobaComponent OnDestroy()')
  }
}
