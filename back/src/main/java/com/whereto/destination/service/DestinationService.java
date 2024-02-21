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
//import org.springframework.data.domain.Pageable;
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

    // private final DestinationRepository destinationRepository;
    // private final ActivityService activityService;
    // private final BudgetService budgetService;
    // private final DocumentService documentService;
    // private final SeasonService seasonService;
   

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


//     public List<Destination> getTopDestinations(UserSelections userSelections, int page, int size) {
//         List<Season> seasons = userSelections.getSeasons();
//         List<Budget> budgets = userSelections.getBudgets();
//         List<Activity> activities = userSelections.getActivities();
//         List<Document> documents = userSelections.getDocuments();

//         List<Season> managedSeasons = seasonService.getManagedSeasons(seasons);
//         List<Activity> managedActivities = activityService.getManagedActivities(activities);
//         List<Budget> managedBudgets = budgetService.getManagedBudgets(budgets);
//         List<Document> managedDocuments = documentService.getManagedDocuments(documents);

//         // Fetch destinations using the improved query method        
//         List<Destination> paginatedResult = destinationRepository.findTopDestinationsWithAssociations(
//                 managedSeasons,
//                 managedBudgets,
//                 managedActivities,
//                 managedDocuments,
//                 PageRequest.of(page, size)
//         );
//    paginatedResult.forEach(destination -> {
//         Hibernate.initialize(destination.getSeasons());
//         Hibernate.initialize(destination.getBudgets());
//         Hibernate.initialize(destination.getActivities());
//         Hibernate.initialize(destination.getDocuments());
//     });
//         // Logging for debugging
//         System.out.println("Received UserSelections: " + userSelections);
//         System.out.println("Page: " + page + ", Size: " + size);
//         System.out.println("Paginated Result size: " + paginatedResult.size());

//         return paginatedResult;
//     }


// public List<Destination> getTopDestinations(UserSelections userSelections, int page, int size) {
//     List<Season> seasons = userSelections.getSeasons();
//     List<Budget> budgets = userSelections.getBudgets();
//     List<Activity> activities = userSelections.getActivities();
//     List<Document> documents = userSelections.getDocuments();

//     List<Season> managedSeasons = seasonService.getManagedSeasons(seasons);
//     List<Activity> managedActivities = activityService.getManagedActivities(activities);
//     List<Budget> managedBudgets = budgetService.getManagedBudgets(budgets);
//     List<Document> managedDocuments = documentService.getManagedDocuments(documents);


//     // Fetch destinations for each association separately
//     List<Destination> destinationsBySeason = destinationRepository.findTopDestinationsBySeasonsIn(managedSeasons, PageRequest.of(page, size));
//     List<Destination> destinationsByBudget =  destinationRepository.findTopDestinationsByBudgetsIn(managedBudgets, PageRequest.of(page, size));
//     List<Destination> destinationsByActivity =  destinationRepository.findTopDestinationsByActivitiesIn(managedActivities, PageRequest.of(page, size));
//     List<Destination> destinationsByDocument =  destinationRepository.findTopDestinationsByDocumentsIn(managedDocuments, PageRequest.of(page, size));
// System.out.println("Destinations by Season size: " + destinationsBySeason.size());
// System.out.println("Destinations by Budget size: " + destinationsByBudget.size());
// System.out.println("Destinations by Activity size: " + destinationsByActivity.size());
// System.out.println("Destinations by Document size: " + destinationsByDocument.size());
//     // Combine the results (avoiding duplicates)
//     List<Destination> combinedDestinations = new ArrayList<>();
//     combinedDestinations.addAll(destinationsBySeason);
//     combinedDestinations.addAll(destinationsByBudget);
//     combinedDestinations.addAll(destinationsByActivity);
//     combinedDestinations.addAll(destinationsByDocument);

//       // Convert the set to a list if needed
//     List<Destination> result = new ArrayList<>(combinedDestinations);

//      // Logging for debugging
//         System.out.println("Received UserSelections: " + userSelections);
//         System.out.println("Page: " + page + ", Size: " + size);
//         System.out.println("Result size: " + result.size());
        

//        // Calculate indices for pagination
//         int totalResults = result.size();
//         int startIndex = (page - 1)  * size;
//         int endIndex = Math.min(startIndex + size, totalResults);

//          System.out.println("Start Index: " + startIndex + ", End Index: " + endIndex);

//         // Ensure indices are valid
//         if (startIndex < totalResults) {
//             List<Destination> paginatedResult = result.subList(startIndex, Math.min(endIndex, totalResults));
      
//             // Logging for debugging
//             System.out.println("Result: " + paginatedResult);
//             System.out.println("Paginated Result size: " + paginatedResult.size());

//             return paginatedResult;
//         } else {
//             // If indices are not valid, return an empty list or handle accordingly
//             return Collections.emptyList();
//         }

// }




public List<Destination> getTopDestinations(UserSelections userSelections) {
        List<Season> seasons = userSelections.getSeasons();
        List<Budget> budgets = userSelections.getBudgets();
        List<Activity> activities = userSelections.getActivities();
        List<Document> documents = userSelections.getDocuments();


        List<Season> managedSeasons = seasonService.getManagedSeasons(seasons);
        List<Activity> managedActivities = activityService.getManagedActivities(activities);
        List<Budget> managedBudgets = budgetService.getManagedBudgets(budgets);
        List<Document> managedDocuments = documentService.getManagedDocuments(documents);
 
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
// System.out.println("Managed managedBudgets: " + managedBudgets);
        

//         // Logging for debugging
//         System.out.println("Received UserSelections: " + userSelections);
//         System.out.println("Page: " + page + ", Size: " + size);
//         System.out.println("Result size: " + combinedDestinations.size());

//         //Calculate indices for pagination
//         int totalResults = combinedDestinations.size();
//         int startIndex = (page - 1) * size;
//         int endIndex = Math.min(startIndex + size, totalResults);

//         System.out.println("Start Index: " + startIndex + ", End Index: " + endIndex);

//         // Ensure indices are valid

//         if (startIndex < totalResults) {
//             List<Destination> paginatedResult = combinedDestinations.subList(startIndex, Math.min(endIndex, totalResults));

//             //Logging for debugging

//             System.out.println("Result: " + paginatedResult);
//             System.out.println("Paginated Result size: " + paginatedResult.size());

//             return paginatedResult;
        } 
    }





// public List<Destination> getTopDestinations(UserSelections userSelections) {
//     // Extract user selections
//         List<Season> seasons = userSelections.getSeasons();
//         List<Budget> budgets = userSelections.getBudgets();
//         List<Activity> activities = userSelections.getActivities();
//         List<Document> documents = userSelections.getDocuments();


//         List<Season> managedSeasons = seasonService.getManagedSeasons(seasons);
//         List<Activity> managedActivities = activityService.getManagedActivities(activities);
//         List<Budget> managedBudgets = budgetService.getManagedBudgets(budgets);
//         List<Document> managedDocuments = documentService.getManagedDocuments(documents);


      
//         List<Destination> topDestinations = destinationRepository.findTopDestinationsBySeasonsInAndBudgetsInAndActivitiesInAndDocumentsIn(
//             managedSeasons, managedBudgets, managedActivities, managedDocuments);

  
//     if (topDestinations.isEmpty()) {
//         throw new CustomNotFoundException("No matching destinations found");
//     }

//    return topDestinations;
// }

    
   

