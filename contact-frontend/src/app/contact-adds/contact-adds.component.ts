import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { CategoryService, Category } from 'src/app/services/category.service';

@Component({
  selector: 'app-contact-adds',
  templateUrl: './contact-adds.component.html',
  styleUrls: ['./contact-adds.component.css']
})
export class ContactAddsComponent implements OnInit {
  contactForm!: FormGroup;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      telefoneFixo: [''],
      email: [''],
      endereco: [''],
      aniversario: [''],
      redeSocial: [''],
      empresa: [''],
      cargo: [''],
      observacao: [''],
      categoria: ['', Validators.required],
      favorito: [false]
    });

    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: () => {
        console.error('Erro ao carregar categorias');
      }
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const contact = this.contactForm.value;
      this.contactService.addContact(contact).subscribe({
        next: () => {
          alert('Contato adicionado com sucesso!');
          this.contactForm.reset({ favorito: false });
        },
        error: () => {
          alert('Erro ao adicionar contato');
        }
      });
    }
  }

  toggleFavorito(): void {
    const atual = this.contactForm.get('favorito')?.value;
    this.contactForm.get('favorito')?.setValue(!atual);
  }

  clearForm(): void {
    this.contactForm.reset({ favorito: false });
  }
}
