import { Injectable, ApplicationRef,  Injector, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import {DomPortalOutlet, Portal, CdkPortalOutlet} from '@angular/cdk/portal';
@Injectable({
  providedIn: 'root'
})
export class TeleportService {
  private portalOutlet: DomPortalOutlet | null = null;
  cdkPortalOutlet: CdkPortalOutlet | null = null;
  
  constructor(private appRef: ApplicationRef, private injector: Injector, private cfr: ComponentFactoryResolver) { }

  registerPortalOutlet(outletElement: HTMLElement) {
    this.portalOutlet = new DomPortalOutlet(
      outletElement,
      undefined,
      this.appRef,
      this.injector,
      document
    );
  }

  registerCdkPortalOutlet(vcr: ViewContainerRef) {
    this.cdkPortalOutlet = new CdkPortalOutlet(this.cfr, vcr);
  }


  unregisterPortalOutlet(): void {
    this.portalOutlet?.dispose();
    this.portalOutlet = null;
  }

  teleport(portal: Portal<any>) {
    this.portalOutlet?.attach(portal);
  }
  teleportCdk(portal: Portal<any>) {
    // this.portalOutlet?.attach(portal);
    this.cdkPortalOutlet?.attach(portal);
  }

  finishTeleportation(): void {
    this.portalOutlet?.detach();
  }
  finishCdkTeleportation(): void {
    this.cdkPortalOutlet?.detach();
  }
}
