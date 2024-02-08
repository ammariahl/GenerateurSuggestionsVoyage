package com.whereto.destination.service;

import com.whereto.destination.entity.Document;
import com.whereto.destination.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DocumentService {
    private final DocumentRepository documentRepository;

    @Autowired
    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    public List<Document> getManagedDocuments(List<Document> documents) {
          List<Document> managedDocuments = new ArrayList<>();
          for (Document document : documents) {
            Optional<Document> optionalDocument = documentRepository.findById(document.getId());
            
            if (optionalDocument.isPresent()) {
                managedDocuments.add(optionalDocument.get());
            } else {
                // Handle the case when the season is not found in the database
                // throw an exception 
            }
        }

        return managedDocuments;

    }
}

