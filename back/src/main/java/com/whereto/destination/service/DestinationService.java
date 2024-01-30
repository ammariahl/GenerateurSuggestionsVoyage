package com.whereto.destination.service;

import com.whereto.destination.entity.Budget;
import com.whereto.destination.entity.Destination;
import com.whereto.destination.entity.Season;
import com.whereto.destination.entity.Weather;
import com.whereto.destination.dto.UserSelections;
import com.whereto.destination.repository.DestinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DestinationService {

    private final DestinationRepository destinationRepository;

    @Autowired
    public DestinationService(DestinationRepository destinationRepository) {
        this.destinationRepository = destinationRepository;
    }

   
    public List<Destination> getTopDestinations(UserSelections userSelections, int limit) {
        // TODO Implement logic here to fetch top destinations based on user selections
        return destinationRepository.findTopDestinations(userSelections, limit);
    }
   
}
