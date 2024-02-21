
package com.whereto.destination.repository;


import com.whereto.destination.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.Query;


@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
      List<Document> findByCniUeAndPassportUeAndVisaUeAndPassportMde(
            boolean cniUe, boolean passportUe, boolean visaUe, boolean passportMde);

//     @Query("SELECT DISTINCT d FROM Document d LEFT JOIN FETCH d.destinations")
//     List<Document> findAllWithDestinations();       

}
