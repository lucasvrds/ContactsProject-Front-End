package br.com.project.java.contact.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.project.java.contact.entities.Contact;
import br.com.project.java.contact.services.ContactService;

@RestController
@RequestMapping("contacts")
@CrossOrigin
public class ContactController {

    @Autowired
    private ContactService service;


    @GetMapping
    public ResponseEntity<List<Contact>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contact> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<Contact> save(@RequestBody Contact contact) {
        Contact saved = service.save(contact);
        URI location = URI.create("contacts/" + saved.getId());
        return ResponseEntity.created(location).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contact> update(@PathVariable Long id,
                                          @RequestBody Contact contact) {
        return ResponseEntity.ok(service.update(id, contact));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/search")
    public ResponseEntity<List<Contact>> searchByName(@RequestParam String nome) {
        return ResponseEntity.ok(service.searchByName(nome));
    }

    @GetMapping("/categoria")
    public ResponseEntity<List<Contact>> byCategoria(@RequestParam String categoria) {
        return ResponseEntity.ok(service.filterByCategoria(categoria));
    }

    @GetMapping("/favoritos")
    public ResponseEntity<List<Contact>> getFavoritos() {
        return ResponseEntity.ok(service.getFavoritos());
    }
}
