import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  textSlide = ['a great ', 'a beautiful ', 'a tiptop ', 'an excellent ', 'a remarkable ', 'an awesome', 'an exquisit', 'an unforgetable'];

  currentText = 0;

  ngOnInit() {
    this.updateTextSlide();
  }

  updateTextSlide() {

    setInterval(() => {
      this.currentText++
      this.currentText = this.currentText % this.textSlide.length;
    }, 3000);

  }





}
