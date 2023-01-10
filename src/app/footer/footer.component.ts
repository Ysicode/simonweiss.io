import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent extends NavbarComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  constructor() {
    super();
  }

  override ngOnInit(): void {
  }

}
