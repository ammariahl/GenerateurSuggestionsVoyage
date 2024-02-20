package com.whereto.destination.repository;


import com.whereto.destination.entity.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;
import java.util.List;
import com.whereto.destination.entity.Budget;
import com.whereto.destination.entity.Document;
import com.whereto.destination.entity.Season;
import com.whereto.destination.entity.Activity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface DestinationRepository extends JpaRepository<Destination , Long>{

    List<Destination> findAll(); 


   @Query("SELECT DISTINCT d FROM Destination d " +
           "LEFT JOIN d.seasons s " +
           "LEFT JOIN d.budgets b " +
           "LEFT JOIN d.activities a " +
           "LEFT JOIN d.documents doc " +
           "WHERE s IN :seasons AND b IN :budgets AND a IN :activities AND doc IN :documents")
    List<Destination> findTopDestinationsBySeasonsInAndBudgetsInAndActivitiesInAndDocumentsIn(
         List<Season> seasons,
        List<Budget> budgets, 
         List<Activity> activities,         
         List<Document> documents);
    
    List<Destination> findTopDestinationsByDocumentsIn(List<Document> documents);
    
    
}
