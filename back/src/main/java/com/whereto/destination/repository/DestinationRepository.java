package com.whereto.destination.repository;


import com.whereto.destination.entity.Destination;
import com.whereto.destination.entity.Season;
import com.whereto.destination.entity.Budget;
import com.whereto.destination.entity.Weather;
import com.whereto.destination.entity.Activity;
import com.whereto.destination.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;
import java.util.List;

@Repository
public interface DestinationRepository extends JpaRepository< Destination , long>{

    List<Destination> findTopDestinationsBySeasonAndBudgetAndWeatherAndActivityAndDocument(
        Season season, Budget budget, Weather weather, Activity activity, Document document, Pageable pageable);
    
}
