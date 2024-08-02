import { ChangeDetectionStrategy, Input, Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { DomPortal } from '@angular/cdk/portal';

import { TeleportService } from '../teleport.service';
import { CustomPortalDirective } from '../custom-portal.directive';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  imports: [CustomPortalDirective]
})
export class ModalComponent implements AfterViewInit{
  _index?: number;
  @Input('teleport-index') set index(value: any) {
    this._index = Number(value)
  };

  ngAfterViewInit(): void {
      console.log('app-modal.ngAfterViewInit()', this._index)
  }

  // constructor(private teleportService: TeleportService){}
  
  // @ViewChild('content') set content(elemRef: ElementRef<HTMLElement>) {
  //   console.log('app-modal teleport()');
  //   this.teleportService.teleport(new DomPortal(elemRef));
  //   // this.teleportService.teleportCdk(new DomPortal(elemRef));
  // }
  
  // ngOnDestroy(): void {
  //   console.log('app-modal finishTeleportation()')
  //   this.teleportService.finishTeleportation();
  // }
}
