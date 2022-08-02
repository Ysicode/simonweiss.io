import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ChatComponent } from './chat/chat.component';
import { ProjectsComponent } from './projects/projects.component';
import { StartpageComponent } from './startpage/startpage.component';






const routes: Routes = [
  { path: '', component: StartpageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'chat', component: ChatComponent }
];




@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
