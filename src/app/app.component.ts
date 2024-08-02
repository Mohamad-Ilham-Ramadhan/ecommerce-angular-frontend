import { Component, TemplateRef, Input, OnChanges, SimpleChanges, AfterViewInit, AfterViewChecked, ViewChild, ElementRef, ViewContainerRef, ChangeDetectionStrategy} from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule  } from '@angular/forms';

import { PortalOutlet, PortalModule, ComponentPortal } from '@angular/cdk/portal';

import { SellerFormComponent } from './seller-form/seller-form.component';
import { HeaderComponent } from './header/header.component';

import { TeleportService } from './teleport.service';
import { NewModalService } from './services/new-modal.service';
import { CustomModalContentComponent } from './custom-modal-content/custom-modal-content.component';
import { NewModalComponent } from './new-modal/new-modal.component';

import { ModalComponent } from './modal/modal.component';
import { CobaComponent } from './coba/coba.component';
import { VcrComponent } from './vcr/vcr.component';
import { CustomPortalOutletDirective } from './custom-portal-outlet.directive';
import { CobaDirective } from './coba.directive';
import { CobaService } from './services/coba.service';
import { FooComponent } from './foo/foo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FooComponent, CobaDirective, NewModalComponent, CustomModalContentComponent, CustomPortalOutletDirective, PortalModule, RouterOutlet, RouterLinkActive, RouterLink, FormsModule, SellerFormComponent, HeaderComponent, CobaComponent, VcrComponent, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit{
  constructor(private http: HttpClient, private vcr: ViewContainerRef, private modalService: NewModalService, private cobaService: CobaService) {}

  openCoba(name: string, contentTemplate?: TemplateRef<any>, footerTemplate?: TemplateRef<any>) {
    this.cobaService.open(name, contentTemplate, footerTemplate)
  }
  removeCoba(name: string) {
    this.cobaService.detach(name);
  }
  openCoba2(name: string, contentTemplate?: TemplateRef<any>, footerTemplate?: TemplateRef<any>) {
    this.cobaService.open(name, contentTemplate, footerTemplate)
  }
  removeCoba2(name: string) {
    this.cobaService.detach(name);
  }

  showFoo = true;
  toggleFoo() {
    this.showFoo = !this.showFoo;
  }
  
  @ViewChild('cardContent', { read: ViewContainerRef}) cardContent?: ViewContainerRef;
  @ViewChild('cardTemplate') cardTemplate?: TemplateRef<any>;
  
  openModal(modalTemplate?: TemplateRef<any>) {
    this.modalService.open(modalTemplate, {size: 'xl', title: 'Fus'}).subscribe(action => {
      console.log('modalAction', action);
    });
  }
  
  
  counter: number = 0;
  increment() {
    this.counter = this.counter + 1;
  }
  ngAfterViewInit(): void {
    // this.modalPortal = new ComponentPortal(ModalComponent);
    if (this.cardTemplate !== undefined) {
      this.cardContent?.createEmbeddedView(this.cardTemplate)
    }
  }


  ilham?: string;
  inputIlham: string = '';
  changeCobaIlham() {
    this.ilham = this.inputIlham;
  }
  
  dataName = '';
  dataEmail = '';

  modalPortal?: ComponentPortal<ModalComponent>;

  getData() {
    this.http.get('http://localhost:3000/').subscribe( (data: any)  => {
      console.log('data', data)
      this.dataName = data.name ;
      this.dataEmail = data.email ;
    })
  }
  clear() {
    this.dataName = ''; this.dataEmail = '';
  }
  adminForm = new FormGroup({
    username: new FormControl('admin'),
    password: new FormControl('asdfasdf'),
    name: new FormControl('ilham ganteng'),
    email: new FormControl('ilham@ganteng.com'),
    image: new FormControl<File | null>(null),
  });

  changeImage(e: Event) {
    let file: File | null;
    // @ts-ignore
    file =  e?.target?.files[0] === undefined ? null : e?.target?.files[0];
    this.adminForm.patchValue({image: file})
  }
  
  submitAdmin($event: any) {
    const {username, password, name, email, image} = this.adminForm.controls;
    console.log('this.adminForm', this.adminForm, 'username', username.getRawValue())
    const form = new FormData();
    form.append('username', username.value ? username.value : '')
    form.append('password', password.value ? password.value : '')
    form.append('name', name.value ? name.value : '')
    form.append('email', email.value ? email.value : '')
    // @ts-ignore
    form.append('image', image.value ? image.value : '')
    console.log('submited form', form.get('username'))

    const formJson = JSON.stringify({
      username: username.value,
      password: password.value,
      name: name.value,
      email: email.value
    })

    const h = new HttpHeaders()
    
    this.http.post('http://localhost:3000/', form).subscribe(response => {
      console.log('server response:', response);
    });
  }
}
