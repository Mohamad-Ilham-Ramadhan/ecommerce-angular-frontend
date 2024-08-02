import { Injectable, TemplateRef, createComponent, EnvironmentInjector, ComponentRef, Inject, AfterViewInit, EmbeddedViewRef, ViewContainerRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CobaComponent } from '../coba/coba.component';

type StoreItem = {
  componentRef: ComponentRef<any>;
  contentViewRef?: EmbeddedViewRef<any>;
  footerViewRef?: TemplateRef<any>;
}

@Injectable({
  providedIn: 'root'
})
export class CobaService implements AfterViewInit {
  constructor(private environmentInjector: EnvironmentInjector, @Inject(DOCUMENT) private document: Document){
    console.log('CobaService constructor()')
  }

  store = new Map<string, StoreItem>();
  name: string | null = null; // value of last called @param name in open() method.

  open(name: string, content?: TemplateRef<any>, footer?: TemplateRef<any>) {
    console.log('coba.service open(): ')
    if (this.store.get(name)) {
      console.log('UDAH ADA')
      return;
    }
    this.name = name;

    let cobaComponent: ComponentRef<CobaComponent>;
    let storeItem: StoreItem;
    if (content) {
      const contentViewRef = content?.createEmbeddedView(null);
      cobaComponent = createComponent(CobaComponent, {environmentInjector: this.environmentInjector, projectableNodes: [contentViewRef.rootNodes]})
      console.log('open() after createComponent()')
      storeItem = {
        componentRef: cobaComponent,
        contentViewRef,
      }
    } else {
      cobaComponent = createComponent(CobaComponent, {environmentInjector: this.environmentInjector})
      console.log('open() after createComponent()')
      storeItem = { componentRef: cobaComponent}
    }
    if (footer) {
      const footerViewRef = footer?.createEmbeddedView(null);
      // storeItem.footerViewRef = footerViewRef;
      storeItem.footerViewRef = footer;
    }
    this.store.set(name, storeItem);

    cobaComponent.hostView.detectChanges()
    this.document.body.appendChild(cobaComponent.location.nativeElement);
  }
  /**
   * 
   * @param name string = to embbed the given footer template to the <ng-continer #footer> on coba.component template
   */
  attachFooter(name: string, footerContainer: ViewContainerRef) {
    console.log('name', name, this.store)
    const storeItem: StoreItem | undefined = this.store.get(name);
    console.log('listen ngAfterViewInit on coba.component', storeItem?.componentRef.instance.footer);

    if (storeItem?.footerViewRef) {
      footerContainer.createEmbeddedView(storeItem?.footerViewRef)
    }
  }

  detach(name: string) {
    const storeItem: StoreItem | undefined = this.store.get(name);
    storeItem?.componentRef.location.nativeElement.remove();
    storeItem?.componentRef.destroy();
  }

  ngAfterViewInit(): void {
    console.log('coba.service ngAfterViewInit')
  }
}
