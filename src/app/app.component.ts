import { Component } from '@angular/core';
import { __classPrivateFieldSet } from 'tslib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  addClasslist(id: string, classList: string) {
    document.getElementById(id).classList.add(classList);
  }

  removeClasslist(id: string, classList: string) {
    document.getElementById(id).classList.remove(classList);
  }
}
