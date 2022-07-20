import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss']
})
export class StartpageComponent implements OnInit {

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
