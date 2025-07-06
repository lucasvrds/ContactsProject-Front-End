package br.com.project.java.contact.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.project.java.contact.entities.Contact;

import java.util.List;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    List<Contact> findByNomeContainingIgnoreCase(String nome);
    List<Contact> findByEmailContainingIgnoreCase(String email);
    List<Contact> findByTelefone(String telefone);
    List<Contact> findByCategoriaIgnoreCase(String categoria);
    List<Contact> findByFavoritoTrue();
    
}
