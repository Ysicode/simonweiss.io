import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { StartpageComponent } from './startpage/startpage.component';






const routes: Routes = [
  { path: '', component: StartpageComponent },
  { path: 'about', component: AboutComponent }
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
