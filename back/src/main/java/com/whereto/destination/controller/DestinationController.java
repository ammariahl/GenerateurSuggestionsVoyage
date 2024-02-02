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

import java.util.List;

@RestController
@RequestMapping("api/destionations")
public class DestinationController {

  private final DestinationService destinationService;

    @Autowired
    public DestinationController(DestinationService destinationService) {
        this.destinationService = destinationService;
    }

//    @GetMapping("/top")
//     public ResponseEntity<List<Destination>> getTopDestinations(@RequestParam int limit, @RequestBody UserSelections userSelections) {
//         List<Destination> topDestinations = destinationService.getTopDestinations(userSelections, limit);
//         return new ResponseEntity<>(topDestinations, HttpStatus.OK);
//     }

        @GetMapping("/all")
    public ResponseEntity<List<Destination>> getAllDestinations() {
        List<Destination> allDestinations = destinationService.getAllDestinations();
        return new ResponseEntity<>(allDestinations, HttpStatus.OK);
    }

    
}
