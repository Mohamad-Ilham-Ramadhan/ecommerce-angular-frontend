import { Component,inject,OnInit} from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink, Router, UrlSegment, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink, HeaderComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  showHeader = true;

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val?.url?.slice(1,6) === 'admin') {
        this.showHeader = false;
      } else {
        this.showHeader = true;
      }
    });
  }
  title = 'angular-e-commerce';
}
