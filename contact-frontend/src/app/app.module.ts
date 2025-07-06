import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactAddsComponent } from './contact-adds/contact-adds.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactInfoComponent } from './contact-info/contact-info.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    ContactsComponent,
    ContactAddsComponent,
    FavoritesComponent,
    ContactInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,  
    FormsModule,  
    HttpClientModule, 
    NgbModule         
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
