package br.com.project.java.contact.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.com.project.java.contact.entities.Contact;
import br.com.project.java.contact.repositories.ContactRepository;

@Service
public class ContactService {

    @Autowired
    private ContactRepository repository;


    public List<Contact> getAll() {
        return repository.findAll();
    }

    public Contact getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Contato não encontrado"));
    }

    public Contact save(Contact contact) {
        return repository.save(contact);
    }

    public Contact update(Long id, Contact contact) {
        getById(id);               
        contact.setId(id);
        return repository.save(contact);
    }

    public void delete(Long id) {
        getById(id);               
        repository.deleteById(id);
    }

    
    public List<Contact> searchByName(String nome) {
        return repository.findByNomeContainingIgnoreCase(nome);
    }

    public List<Contact> searchByEmail(String email) {
        return repository.findByEmailContainingIgnoreCase(email);
    }

    public List<Contact> searchByPhone(String telefone) {
        return repository.findByTelefone(telefone);
    }

    public List<Contact> filterByCategoria(String categoria) {
        return repository.findByCategoriaIgnoreCase(categoria);
    }

    public List<Contact> getFavoritos() {
        return repository.findByFavoritoTrue();
    }
}
