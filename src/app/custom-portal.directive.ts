import { Directive, TemplateRef, OnDestroy, AfterViewInit, Input, HostListener} from '@angular/core';
import { CustomTeleportService } from './custom-teleport.service';

@Directive({
  selector: '[custom-teleport-to]',
  standalone: true
})
export class CustomPortalDirective implements OnDestroy, AfterViewInit {
  @Input('custom-teleport-to') teleportIndex?: number;

  @HostListener('click') onClick() {
    console.log('[custom-teleport-to].click() ', this.teleportIndex)
  }

  constructor(
    private readonly templateRef: TemplateRef<unknown>,
    private readonly teleportService: CustomTeleportService
  ){
    // console.log('customTeleportTo @Directive constructor()', this.templateRef.elementRef.nativeElement)
    // console.log('[custom-teleport-to].teleportIndex', this.teleportIndex)
    // const apaini = this.teleportService.teleport(this.templateRef, this.teleportIndex);
    //   console.log('ngAfterViewInit() [custom-teleport-to].index', this.teleportIndex)
    this.teleportService.teleport(this.templateRef, this.teleportIndex)
  }
  
  ngAfterViewInit(): void {
    // this.teleportService.regsiterEmbeddedView(this.teleportIndex ? this.teleportIndex : 0);
    console.log('[custom-teleport-to].ngAfterViewInit()')
  }
  
  ngOnDestroy(): void {
    // console.log('customTeleportTo @Directive ngOnDestroy(). index: ', this.teleportIndex)
      this.teleportService.finishTeleportation(this.teleportIndex);
      console.log('this.templateRef', this.templateRef);
  }
}
