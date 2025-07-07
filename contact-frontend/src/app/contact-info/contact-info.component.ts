import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService, Contact } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css'],
})
export class ContactInfoComponent implements OnInit {
  contactForm!: FormGroup;
  contactId!: number;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.contactId = Number(this.route.snapshot.paramMap.get('id'));
    this.contactForm = this.fb.group({
      nome: ['', Validators.required],
      telefone: [''],
      email: [''],
      endereco: [''],
      aniversario: [''],
      redeSocial: [''],
      empresa: [''],
      cargo: [''],
      observacao: [''],
      telefoneFixo: [''],
      categoria: [''],
      favorito: [false],
    });

    this.loadContact();
  }

  loadContact(): void {
    this.isLoading = true;
    this.contactService.getContactById(this.contactId).subscribe({
      next: (contact) => {
        this.contactForm.patchValue(contact);
        this.isLoading = false;
      },
      error: (err) => {
        alert('Erro ao carregar contato.');
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const updatedContact: Contact = {
        ...this.contactForm.value,
        id: this.contactId,
      };

      this.contactService.updateContact(updatedContact).subscribe({
        next: () => {
          alert('Contato atualizado com sucesso!');
          this.router.navigate(['/contacts']);
        },
        error: () => {
          alert('Erro ao atualizar contato');
        },
      });
    }
  }

  toggleFavorito(): void {
    const current = this.contactForm.get('favorito')?.value;
    this.contactForm.get('favorito')?.setValue(!current);
  }

  goBack(): void {
    this.router.navigate(['/contacts']);
  }
}
