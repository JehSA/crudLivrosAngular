import { CreateLivrosComponent } from './components/create-livros/create-livros.component';
import { ListLivrosComponent } from './components/list-livros/list-livros.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'list-livros', pathMatch: 'full' },
  { path: 'list-livros', component: ListLivrosComponent },
  { path: 'create-livros', component: CreateLivrosComponent },
  { path:'edit-livros/:id', component: CreateLivrosComponent },
  { path: '**', redirectTo: 'list-livros', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
