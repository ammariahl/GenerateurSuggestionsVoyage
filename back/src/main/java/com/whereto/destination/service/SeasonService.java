package com.whereto.destination.service;

import com.whereto.destination.entity.Season;
import com.whereto.destination.repository.SeasonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.whereto.destination.exception.CustomNotFoundException;

@Service
public class SeasonService {
    private final SeasonRepository seasonRepository;

    @Autowired
    public SeasonService(SeasonRepository seasonRepository) {
        this.seasonRepository = seasonRepository;
    }

    // public List<Season> getAllSeasonsWithDestinations() {
    //     return seasonRepository.findAllWithDestinations();
    // }

    public List<Season> getManagedSeasons(List<Season> seasons) {

           List<Season> managedSeasons = new ArrayList<>();

    for (Season season : seasons) {
       List<Season> matchingSeasons = getSeasonByField(season);

        if (!matchingSeasons.isEmpty()) {
            managedSeasons.add(matchingSeasons.get(0));
        } else {
           throw new CustomNotFoundException("This season is not found in the database");
        }
    }
       

        return managedSeasons;

    }


  private List<Season> getSeasonByField(Season season) {
        List<Season> result = new ArrayList<>();

        if (season.getSpring() != null) {
            result.addAll(seasonRepository.findBySpring(season.getSpring()));
        }
        if (season.getAutumn() != null) {
            result.addAll(seasonRepository.findByAutumn(season.getAutumn()));
        }
        if (season.getSummer() != null) {
            result.addAll(seasonRepository.findBySummer(season.getSummer()));
        }
        if (season.getWinter() != null) {
            result.addAll(seasonRepository.findByWinter(season.getWinter()));
        }

        return result;
    }
}