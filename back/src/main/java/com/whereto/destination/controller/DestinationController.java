package com.whereto.destination.controller;

import com.whereto.destination.entity.Destination;
import com.whereto.destination.service.DestinationService;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import com.whereto.destination.dto.UserSelections;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.whereto.destination.repository.DestinationRepository;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.domain.Pageable;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("api/destionations")
public class DestinationController {

  private final DestinationService destinationService;
  private static final Logger log = LoggerFactory.getLogger(DestinationController.class);

    @Autowired
    public DestinationController(DestinationService destinationService) {
        this.destinationService = destinationService;
    }
        @PostMapping(value = "/top",consumes = "application/json")
        public ResponseEntity<List<Destination>> getTopDestinations(@RequestBody UserSelections userSelections) {
            List<Destination> topDestinations = destinationService.getTopDestinations(userSelections);
            // log.debug("Received request. UserSelections: {}", userSelections);
            return new ResponseEntity<>(topDestinations, HttpStatus.OK);
        }

        @GetMapping("/all")
        public ResponseEntity<List<Destination>> getAllDestinations() {
            List<Destination> allDestinations = destinationService.getAllDestinations();
            return new ResponseEntity<>(allDestinations, HttpStatus.OK);
        }

   
    
}
