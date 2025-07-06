import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-adds',
  templateUrl: './contact-adds.component.html',
  styleUrls: ['./contact-adds.component.css']
})
export class ContactAddsComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
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
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const contact = this.contactForm.value;
      this.contactService.addContact(contact).subscribe({
        next: () => {
          alert('Contato adicionado com sucesso!');
          this.contactForm.reset({
            favorito: false
          });
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
    this.contactForm.reset({
      favorito: false
    });
  }
}
