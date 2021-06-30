import { LocalStorageService } from './services/local-storage.service';
import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PizzaFrontend';
  showSize = true;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
}

