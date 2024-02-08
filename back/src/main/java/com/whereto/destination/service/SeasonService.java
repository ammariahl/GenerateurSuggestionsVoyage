package com.whereto.destination.service;

import com.whereto.destination.entity.Season;
import com.whereto.destination.repository.SeasonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SeasonService {
    private final SeasonRepository seasonRepository;

    @Autowired
    public SeasonService(SeasonRepository seasonRepository) {
        this.seasonRepository = seasonRepository;
    }

    public List<Season> getManagedSeasons(List<Season> seasons) {
          List<Season> managedSeasons = new ArrayList<>();
          for (Season season : seasons) {
            Optional<Season> optionalSeason = seasonRepository.findById(season.getId());
            
            if (optionalSeason.isPresent()) {
                managedSeasons.add(optionalSeason.get());
            } else {
                // Handle the case when the season is not found in the database
                // throw an exception 
            }
        }

        return managedSeasons;

    }
}
