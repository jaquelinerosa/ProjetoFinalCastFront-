import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { DeleteComponent } from './components/delete/delete.component';
import { HomeComponent } from './components/home/home.component';
import { UpdateComponent } from './components/update/update.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'create-cursos',
    component: CreateComponent
  },
  {
    path: 'delete-cursos',
    component: DeleteComponent
  },
  {
    path: 'update-cursos',
    component: UpdateComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
