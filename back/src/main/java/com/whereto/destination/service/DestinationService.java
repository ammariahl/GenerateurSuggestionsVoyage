package com.whereto.destination.service;


import com.whereto.destination.entity.Budget;
import com.whereto.destination.entity.Destination;
import com.whereto.destination.entity.Season;
import com.whereto.destination.entity.Activity;
import com.whereto.destination.entity.Document;
import com.whereto.destination.dto.UserSelections;
import com.whereto.destination.repository.DestinationRepository;
import java.util.HashSet;
import java.util.LinkedHashSet;
import org.hibernate.mapping.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.whereto.destination.exception.CustomNotFoundException;
import java.util.Collections;
import java.util.stream.Collectors;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import org.hibernate.Hibernate;

@Service
public class DestinationService {

    @Autowired
    private DestinationRepository destinationRepository;

    @Autowired
    private SeasonService seasonService;

    @Autowired
    private ActivityService activityService;

    @Autowired
    private BudgetService budgetService;

    @Autowired
    private DocumentService documentService;

    @Autowired
    public DestinationService(DestinationRepository destinationRepository,
                              SeasonService seasonService,
                              ActivityService activityService,
                              BudgetService budgetService,
                              DocumentService documentService) 
    {
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
        List<Season> seasons = userSelections.getSeasons();
        List<Budget> budgets = userSelections.getBudgets();
        List<Activity> activities = userSelections.getActivities();
        List<Document> documents = userSelections.getDocuments();

        List<Season> managedSeasons = seasonService.getManagedSeasons(seasons);
        List<Activity> managedActivities = activityService.getManagedActivities(activities);
        List<Budget> managedBudgets = budgetService.getManagedBudgets(budgets);
        List<Document> managedDocuments = documentService.getManagedDocuments(documents);
<<<<<<< HEAD
        
//   Sort sort = createSortFromUserSelections(userSelections);
 List<Destination> combinedDestinations = destinationRepository.findTopDestinationsWithAssociations(
        managedSeasons,
        managedBudgets,
        managedActivities,
        managedDocuments
        
        
    );
     System.out.println("Managed managedBudgets: " + managedBudgets);

    // Logging for debugging
    System.out.println("Received UserSelections: " + userSelections);
    System.out.println("Result size: " + combinedDestinations.size());

    return combinedDestinations;

        } 


    }




    
   
=======
 
        List<Destination> combinedDestinations = destinationRepository.findTopDestinationsWithAssociations(
            managedSeasons,
            managedBudgets,
            managedActivities,
            managedDocuments
        );

        System.out.println("Managed managedBudgets: " + managedBudgets);
        // Logging for debugging
        System.out.println("Received UserSelections: " + userSelections);
        System.out.println("Result size: " + combinedDestinations.size());

        return combinedDestinations;
    } 
}
>>>>>>> a38228f386cc93d30d09132cff7192952cc51152

