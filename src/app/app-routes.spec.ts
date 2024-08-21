import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Location } from "@angular/common";
import { Router, provideRouter} from "@angular/router";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { routes } from "./app.routes";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('App routing', () => {
   let router: Router;
   let location: Location;
   let fixture: ComponentFixture<AppComponent>
   let homeFixture: ComponentFixture<HomeComponent>
   let aboutFixture: ComponentFixture<AboutComponent>
   let el: DebugElement;
   let aboutEl: DebugElement;
   
   beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
         imports: [AppComponent, HomeComponent, AboutComponent],
         providers: [
            provideRouter(routes),
         ]
      }).compileComponents();
   }))

   beforeEach(() => {
      router = TestBed.inject(Router);
      router.initialNavigation();
      location = TestBed.inject(Location);
      fixture = TestBed.createComponent(AppComponent);
      homeFixture = TestBed.createComponent(HomeComponent);
      aboutFixture = TestBed.createComponent(AboutComponent);
      el = homeFixture.debugElement;
      aboutEl = aboutFixture.debugElement;
   });

   it('should navigate to home component', waitForAsync(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
         console.log('location', location)
         expect(location.path()).toBe('/home');
      });
   }));

   it('should navigate to about page when clicking the button in home component', waitForAsync(() => {
      homeFixture.detectChanges();
      let buttons = el.queryAll(By.css('.btn'))
      buttons[0].nativeElement.click();
      homeFixture.whenStable().then(() => {
         expect(location.path()).toBe('/about')
      });
   }));

   it('should navigate to home page when clicking the button in about component', waitForAsync(() => {
      aboutFixture.detectChanges();
      let buttons = aboutEl.queryAll(By.css('.btn'))
      console.log('buttons', buttons)
      buttons[0].nativeElement.click();
      console.log(buttons[0].nativeElement);
      aboutFixture.whenStable().then(() => {
         expect(location.path()).toBe('/home')
      });
   }));
});