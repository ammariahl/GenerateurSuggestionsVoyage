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
    private final ActivityService activityService;
    private final BudgetService budgetService;
    private final DocumentService documentService;
    private final SeasonService seasonService;
   

    @Autowired
    public DestinationService(DestinationRepository destinationRepository,
                              SeasonService seasonService,
                              ActivityService activityService,
                              BudgetService budgetService,
                              DocumentService documentService
    ) {
        this.destinationRepository = destinationRepository;
        this.seasonService = seasonService;
        this.activityService = activityService;
        this.budgetService = budgetService;
        this.documentService = documentService;

    }

    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }

public List<Destination> getTopDestinations(UserSelections userSelections) {
    // Extract user selections
        List<Season> seasons = userSelections.getSeasons();
        List<Budget> budgets = userSelections.getBudgets();
        List<Activity> activities = userSelections.getActivities();
        List<Document> documents = userSelections.getDocuments();


        List<Season> managedSeasons = seasonService.getManagedSeasons(seasons);
        List<Activity> managedActivities = activityService.getManagedActivities(activities);
        List<Budget> managedBudgets = budgetService.getManagedBudgets(budgets);
        List<Document> managedDocuments = documentService.getManagedDocuments(documents);


    return destinationRepository.findTopDestinationsBySeasonsInAndBudgetsInAndActivitiesInAndDocumentsIn(
                 managedSeasons, managedBudgets, managedActivities, managedDocuments);
   
}






    }
   

