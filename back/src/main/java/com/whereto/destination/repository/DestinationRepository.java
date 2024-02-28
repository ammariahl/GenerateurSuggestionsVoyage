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
import org.springframework.data.domain.Pageable;

@Repository
public interface DestinationRepository extends JpaRepository<Destination , Long>{

    List<Destination> findAll();   
    List<Destination> findTopDestinationsBySeasonsIn(List<Season> seasons);
    List<Destination> findTopDestinationsByBudgetsIn(List<Budget> budgets);
    List<Destination> findTopDestinationsByActivitiesIn(List<Activity> activities);
    List<Destination> findTopDestinationsByDocumentsIn(List<Document> documents);
    List<Destination> findTopDestinationsBySeasonsInAndBudgetsInAndActivitiesInAndDocumentsIn(
        List<Season> seasons,
        List<Budget> budgets,
        List<Activity> activities,
        List<Document> documents);

    @Query("SELECT DISTINCT d FROM Destination d " +
            "JOIN d.seasons s " +
            "JOIN d.budgets b " +
            "JOIN d.activities a " +
            "JOIN d.documents doc " +
            "WHERE s IN :seasons OR b IN :budgets OR a IN :activities OR doc IN :documents")
    List<Destination> findTopDestinationsWithAssociations(
        @Param("seasons") List<Season> seasons,
        @Param("budgets") List<Budget> budgets,
        @Param("activities") List<Activity> activities,
        @Param("documents") List<Document> documents);
}
