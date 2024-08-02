import { Component, AfterViewInit, ViewChild, ContentChild, ViewContainerRef, TemplateRef, ViewRef, ApplicationRef, createComponent, EnvironmentInjector } from '@angular/core';
import { CobaComponent } from '../coba/coba.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-vcr',
  standalone: true,
  imports: [CobaComponent, ModalComponent],
  templateUrl: './vcr.component.html',
  styleUrl: './vcr.component.scss',
  host: {
    '[attr.data-sekda]': 'dataSekda',
  }
})
export class VcrComponent implements AfterViewInit {
  dataSekda = 'Sekda Nur Jaman';
  @ViewChild('span', {read: ViewContainerRef}) span?: ViewContainerRef;
  @ViewChild('custom', {read: ViewContainerRef}) custom?: ViewContainerRef;
  @ViewChild('template', {read: ViewContainerRef}) template?: ViewContainerRef;
  @ViewChild('sudo', {read: ViewContainerRef}) sudo?: ViewContainerRef;

  @ViewChild('keranjang', {read: ViewContainerRef}) keranjang?: ViewContainerRef;

  @ViewChild('langris', {read: ViewRef}) langris?: ViewRef;

  @ContentChild(ModalComponent) cobamodal?: ModalComponent;

  constructor(private vcr: ViewContainerRef, private appRef: ApplicationRef, private injector: EnvironmentInjector){}

  // modalRef = createComponent(ModalComponent, {environmentInjector: this.injector})

  
  
  ngAfterViewInit(): void {
    console.log('cobamodal', this.cobamodal);
    // document.body.appendChild(this.modalRef.location.nativeElement)
    // this.appRef.attachView(this.modalRef.hostView);
    // console.log('>>> host element ', this.vcr)
    // console.log('>>> html element ', this.span)
    // console.log('>>> custom element ', this.custom)
    // console.log('>>> ngTemplate ', this.template)
  }

  toggleCobaModal() {

  }

  destroySpan() {
    this.span?.remove();
  }

  i = 0;

  append(template: TemplateRef<{numba: number, nao: string}>) {
    // this.vcr.createEmbeddedView(template, {numba: this.i++, nao: 'ohe ohe'})
    this.keranjang?.createEmbeddedView(template, {numba: this.i++, nao: 'ohe ohe'});
    // @ts-ignore;
    const xxx = this.keranjang?.insert(this.langris)
    console.log('xxx langirs', xxx);
  }

  clear() {
    this.i = 0;
    this.vcr.clear()
  }

}
