import { Component, OnInit } from '@angular/core';
import { ContactService, Contact } from '../services/contact.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favorites: Contact[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.isLoading = true;
    this.contactService.getContacts().subscribe({
      next: (data) => {
        this.favorites = data.filter((c) => c.favorito);
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar favoritos.';
        this.isLoading = false;
        console.error(error);
      },
    });
  }
}
