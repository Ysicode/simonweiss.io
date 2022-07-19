import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  textSlide = ['Have a great ', 'Be awesome this ', 'Stay happy this ', 'Have a wonderful ', 'Keep smiling this '];

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
