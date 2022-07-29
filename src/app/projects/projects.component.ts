import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent extends AppComponent {
  open_project = '';

  openProject(id: any) {
    this.checkClasslist();
    this.addClasslist(id,'open_project');
  }

  checkClasslist() {
    let project = Array.from(document.getElementsByClassName('project_show_container'));
    project.forEach((element) => {
      if (element.classList.contains('open_project')) {
        element.classList.remove('open_project');
      }
    }); 
  }
}
