import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactAddsComponent } from './contact-adds/contact-adds.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';

const routes: Routes = [
  { path: 'add', component: ContactAddsComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'contacts/:id', component: ContactInfoComponent },
  { path: '', redirectTo: '/contacts', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
