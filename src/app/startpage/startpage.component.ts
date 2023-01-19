import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss']
})
export class StartpageComponent implements OnInit {
  textSlide = ['a great ', 'a beautiful ', 'a tiptop ', 'an excellent ', 'a remarkable ', 'an awesome', 'an exquisit', 'an unforgetable'];
  currentText = 0;
  weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', ' Thursday', 'Friday', 'Saturday'];
  day = new Date();
  today = '';
  number = 0;

  ngOnInit() {
    this.updateTextSlide();
    this.updateDay();
    window.addEventListener('scroll', this.scrollEvent, true);
  }

  scrollEvent = (event: any): void => {
    const scroll = event.srcElement.scrollingElement.scrollTop;
  }

  updateTextSlide() {
    setInterval(() => {
      this.currentText++
      this.currentText = this.currentText % this.textSlide.length;
    }, 3000);
  }

  updateDay() {
    this.today = this.weekday[this.day.getDay()];
  }
  
  

}
