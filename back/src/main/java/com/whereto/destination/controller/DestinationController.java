package com.whereto.destination.controller;

import com.whereto.destination.entity.Destination;
import com.whereto.destination.service.DestinationService;
import com.whereto.destination.service.ActivityService;
import com.whereto.destination.service.SeasonService;
import com.whereto.destination.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import com.whereto.destination.dto.UserSelections;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.whereto.destination.repository.DestinationRepository;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.domain.Pageable;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("api/destinations")
public class DestinationController {

  private final DestinationService destinationService;
  private final ActivityService activityService;
  private final SeasonService seasonService;
  private final BudgetService budgetService;
  private final DestinationRepository destinationRepository;
  private static final Logger log = LoggerFactory.getLogger(DestinationController.class);

    @Autowired
    public DestinationController(
    DestinationService destinationService,
    ActivityService activityService,
    SeasonService seasonService,
    BudgetService budgetService,
    DestinationRepository destinationRepository) {

        this.destinationService = destinationService;
        this.activityService = activityService;
        this.seasonService = seasonService;
        this.budgetService = budgetService;
        this.destinationRepository = destinationRepository;
    }

         @PostMapping(value = "/top", consumes = "application/json")
        public ResponseEntity<List<Destination>> getTopDestinations() {
        List<Destination> topDestinations = destinationService.getAllDestinations();
        return new ResponseEntity<>(topDestinations, HttpStatus.OK);
    }

        @GetMapping("/all")
        public ResponseEntity<List<Destination>> getAllDestinations() {
            List<Destination> allDestinations = destinationService.getAllDestinations();
            return new ResponseEntity<>(allDestinations, HttpStatus.OK);
        }
        @GetMapping("/random")
        public ResponseEntity<List<Destination>> getRandomDestinations() {
            List<Destination> randomDestinations = destinationService.getAllDestinations();
            Collections.shuffle(randomDestinations);
        return new ResponseEntity<>(randomDestinations, HttpStatus.OK);
        }

        @GetMapping("/{id}")
        public ResponseEntity<Destination> getDestinationById(@PathVariable Long id) {
            Optional<Destination> destinationOptional = destinationRepository.findById(id);
            return destinationOptional.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
        @GetMapping("/first3familydestinations")
        public List<Destination> getFirstThreeFamilyDestinations() {
        return activityService.getFirstThreeFamilyDestinations();
    }

    
    @GetMapping("/first3springdestinations")
    public List<Destination> getFirstThreeSpringDestinations() {
        return seasonService.getFirstThreeSpringDestinations();
    }

    @GetMapping("/first3budgetdestinations")
    public List<Destination> getFirstThreeBudgetDestinations() {
        return budgetService.getFirstThreeBudgetDestinations();
    }
}
