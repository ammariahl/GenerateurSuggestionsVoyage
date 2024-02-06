package com.whereto.destination.service;

import com.whereto.destination.entity.Budget;
import com.whereto.destination.entity.Destination;
import com.whereto.destination.entity.Season;
import com.whereto.destination.entity.Activity;
import com.whereto.destination.entity.Document;
import com.whereto.destination.dto.UserSelections;
import com.whereto.destination.repository.DestinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import java.util.Collections;

import java.util.List;
import java.util.Optional;

@Service
public class DestinationService {

    private final DestinationRepository destinationRepository;

    @Autowired
    public DestinationService(DestinationRepository destinationRepository) {
        this.destinationRepository = destinationRepository;
    }

    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }
    public List<Destination> getTopDestinations(UserSelections userSelections, int limit) {
        // Extract user selections
        List<Season> seasons = userSelections.getSeasons();
        List<Budget> budgets = userSelections.getBudgets();
        List<Activity> activities = userSelections.getActivities();
        List<Document> documents = userSelections.getDocuments();

        
  
          Pageable pageable = PageRequest.of(0, limit);
        List<Destination> topDestinations = destinationRepository.findTopDestinationsBySeasonsInAndBudgetsInAndActivitiesInAndDocumentsIn(
                seasons, budgets, activities, documents, pageable);

                return topDestinations != null ? topDestinations : Collections.emptyList();
}
    }
   

