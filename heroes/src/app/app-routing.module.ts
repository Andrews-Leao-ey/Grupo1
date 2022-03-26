import { HeroesListComponent } from './heroes/heroes-list/heroes-list.component';
import { HeroesEditComponent } from './heroes/heroes-edit/heroes-edit.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: '', component: HeroesEditComponent },
  { path: 'lista', component: HeroesListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
