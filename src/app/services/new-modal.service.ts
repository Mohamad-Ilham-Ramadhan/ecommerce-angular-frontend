import { Injectable, TemplateRef, createComponent, EnvironmentInjector, Inject, ComponentRef} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { NewModalComponent } from '../new-modal/new-modal.component';
@Injectable({
  providedIn: 'root'
})
export class NewModalService {
  constructor(private environtmentInjectior: EnvironmentInjector, @Inject(DOCUMENT) private document: Document) { }

  modalNotifier?: Subject<any>;
  opened = false;
  
  open(content?: TemplateRef<any>, options?: {size?: string; title?: string}) {
    console.log('new-modal.service open()')
    this.modalNotifier = new Subject();

    if (this.opened) {
      return this.modalNotifier?.asObservable();;
    } 
    this.opened = true; // if modal not opened;
    let modalComponent: ComponentRef<NewModalComponent>;
    if (content === undefined) {
      modalComponent= createComponent(NewModalComponent, {environmentInjector: this.environtmentInjectior})
    } else {
      const contentViewRef = content.createEmbeddedView(null);
      modalComponent = createComponent(NewModalComponent, {environmentInjector: this.environtmentInjectior, projectableNodes: [contentViewRef.rootNodes]})
    }
    modalComponent.instance.size = options?.size;
    modalComponent.instance.title = options?.title;
    modalComponent.instance.closeEvent.subscribe( () => {
      console.log('new-modal-service.closeEvent.subscribe() ')
      this.closeModal();
    });
    modalComponent.instance.submitEvent.subscribe( () => {
      console.log('new-modal-service.submitEvent.subscribe() ')
      this.submitModal();
    });
    modalComponent.hostView.detectChanges();

    this.document.body.appendChild(modalComponent.location.nativeElement)
    return this.modalNotifier?.asObservable();
  }

  closeModal() {
    this.opened = false;
    this.modalNotifier?.complete();
  }
  submitModal() {
    this.opened = false;
    this.modalNotifier?.next('confirm');
    this.closeModal();
  }
}
