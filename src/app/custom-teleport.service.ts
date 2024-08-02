import { Injectable, TemplateRef, ViewContainerRef, Input, ViewRef, ApplicationRef} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomTeleportService {
  constructor(private appRef: ApplicationRef) {}

  private portalOutlet: ViewContainerRef | null = null;
  private embededView: any;
  private embededViews: any = {};

  registerPortalOutlet(vcr: ViewContainerRef | null, outletName: string | undefined) {
    console.log('registerPortalOutlet().outletName', outletName);
    this.portalOutlet = vcr;
  }
  unregisterPortalOutlet() {
    this.portalOutlet = null;
  }
  teleport(templateRef: TemplateRef<unknown>, index: number | undefined) {
    console.log('custom-teleport.service teleport() index', index)
    console.log('custom-teleport.service teleport() templateRef', templateRef)
    // this.portalOutlet?.
    this.embededView = this.portalOutlet?.createEmbeddedView(templateRef, undefined, {index});
  }
  regsiterEmbeddedView(index: number) {
    this.embededViews[index] = this.embededView;
    console.log('regsiterEmbeddedView', this.embededViews)
  }
  finishTeleportation(index: number | undefined) {
    // console.log('this.portalOutlet', this.portalOutlet)
    this.portalOutlet?.clear();
    console.log('finishTeleportation index', index)
    // this.embededViews[index ? index : 0].destroy();
    console.log('this.embededViews', this.embededViews)

    // this.portalOutlet?.remove(0);
    // this.portalOutlet?.createEmbeddedView()
  }
}
