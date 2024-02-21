package com.whereto.destination.service;

import com.whereto.destination.entity.Document;
import com.whereto.destination.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.whereto.destination.exception.CustomNotFoundException;

@Service
public class DocumentService {
    private final DocumentRepository documentRepository;

    @Autowired
    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    //  public List<Document> getAllDocumentsWithDestinations() {
    //     return documentRepository.findAllWithDestinations();
    // }

    public List<Document> getManagedDocuments(List<Document> documents) {
          List<Document> managedDocuments = new ArrayList<>();
          for (Document document : documents) {
            List<Document> matchingDocuments = getDocumentsByField(document);
            
            if (!matchingDocuments.isEmpty()) {
                // managedDocuments.add(matchingDocuments.get(0));
                 managedDocuments.addAll(matchingDocuments);
                
            } else {
                throw new CustomNotFoundException("Document is not found in the database");
            }
        }

        return managedDocuments;

    }

     private List<Document> getDocumentsByField(Document document) {
        boolean cniUe = document.isCniUe();
        boolean passportUe = document.isPassportUe();
        boolean visaUe = document.isVisaUe();
        boolean passportMde = document.isPassportMde();

        return documentRepository.findByCniUeAndPassportUeAndVisaUeAndPassportMde(
            cniUe, passportUe, visaUe, passportMde);
    }

//     public List<Document> getManagedDocuments(List<Document> documents) {
//     List<Document> managedDocuments = new ArrayList<>();

//     for (Document document : documents) {
//         List<Document> matchingDocuments = getDocumentsByField(document);

//         if (!matchingDocuments.isEmpty()) {
//             managedDocuments.addAll(matchingDocuments);
//         }
//     }

//     if (managedDocuments.isEmpty()) {
//         throw new CustomNotFoundException("No matching documents found in the database");
//     }

//     return managedDocuments;
// }

// private List<Document> getDocumentsByField(Document document) {
//     boolean cniUe = document.isCniUe();
//     boolean passportUe = document.isPassportUe();
//     boolean visaUe = document.isVisaUe();
//     boolean passportMde = document.isPassportMde();

//     return documentRepository.findByCniUeAndPassportUeAndVisaUeAndPassportMde(
//         cniUe, passportUe, visaUe, passportMde);
// }
}

