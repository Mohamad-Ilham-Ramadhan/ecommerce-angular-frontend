import { Directive, OnDestroy, ViewContainerRef, Input, AfterViewInit } from '@angular/core';
import { CustomTeleportService } from './custom-teleport.service';

@Directive({
  selector: '[customTeleportOutlet]',
  standalone: true
})
export class CustomPortalOutletDirective implements OnDestroy, AfterViewInit {
  @Input('customTeleportOutlet') _default?: string;
  @Input('name') name?: string;

  constructor(private readonly vcr: ViewContainerRef, private readonly teleportService: CustomTeleportService) {
    console.log('customTeleportOutlet constructor(), @Input _default: ', this._default);
    console.log('customTeleportOutlet constructor(), @Input name: ', this.name);
  }
  
  ngAfterViewInit(): void {
    this.teleportService.registerPortalOutlet(this.vcr, this.name);
      console.log('[customTeleportOutlet].ngAfterViewInit() @Input name: ', this.name);
  }

  ngOnDestroy(): void {
    console.log('customTeleportOutlet @Directive ngOnDestroy(0)')
    this.teleportService.unregisterPortalOutlet();
  }
}
