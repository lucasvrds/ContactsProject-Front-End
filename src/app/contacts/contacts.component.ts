import { Component, OnInit } from '@angular/core';
import { ContactService, Contact } from '../services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  isLoading = false;
  errorMessage = '';
  searchTerm: string = '';            
  selectedCategory: string = '';       

  constructor(
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.isLoading = true;
    this.contactService.getContacts().subscribe({
      next: (data) => {
        this.contacts = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar contatos.';
        this.isLoading = false;
        console.error(error);
      },
    });
  }

  deleteContact(contact: Contact): void {
    if (confirm(`Deseja realmente excluir o contato ${contact.nome}?`)) {
      this.contactService.deleteContact(contact.id!).subscribe({
        next: () => {
          alert('Contato excluído com sucesso!');
          this.loadContacts();
        },
        error: (error) => {
          alert('Erro ao excluir contato.');
          console.error(error);
        },
      });
    }
  }

  toggleFavorite(contact: Contact): void {
    const updated = { ...contact, favorito: !contact.favorito };
    this.contactService.updateContact(updated).subscribe({
      next: () => {
        this.loadContacts();
      },
      error: () => {
        alert('Erro ao atualizar favorito');
      }
    });
  }

  editContact(contact: Contact): void {
    this.router.navigate(['/contacts', contact.id]);
  }

  getUniqueCategories(): string[] {
    const categories = this.contacts.map(c => c.categoria?.trim() || '');
    return [...new Set(categories)].filter(c => c !== '');
  }

  filteredContacts(): Contact[] {
    const term = this.searchTerm.toLowerCase();

    return this.contacts.filter(contact => {
      const matchesSearch =
        contact.nome.toLowerCase().includes(term) ||
        contact.telefone?.toLowerCase().includes(term) ||
        contact.email?.toLowerCase().includes(term) ||
        contact.categoria?.toLowerCase().includes(term);

      const matchesCategory =
        !this.selectedCategory || contact.categoria === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }
}
