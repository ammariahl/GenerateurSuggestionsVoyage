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

@Repository
public interface DestinationRepository extends JpaRepository<Destination , Long>{

     List<Destination> findAll();

    List<Destination> findTopDestinationsBySeasonsInAndBudgetsInAndActivitiesInAndDocumentsIn(
        List<Season> seasons, List<Budget> budgets, List<Activity> activities, List<Document> documents);
    
}
