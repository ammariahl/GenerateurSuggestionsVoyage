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
        // Extract user selections
        String season = userSelections.getSeason();
        String budget = userSelections.getBudget();
        String weather = userSelections.getWeather();
        String activity = userSelections.getActivity();
        String document = userSelections.getDocument();

        // Fetch top destinations based on user selections
        return destinationRepository.findTopDestinationsBySeasonAndBudgetAndWeatherAndActivityAndDocument(
                season, budget, weather, activity, document, PageRequest.of(0, limit));
    }
   
}
