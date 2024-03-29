package com.whereto.destination.service;


import com.whereto.destination.entity.Activity;
import com.whereto.destination.entity.Destination;
import com.whereto.destination.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.whereto.destination.exception.CustomNotFoundException;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import java.util.Collections;

@Service
public class ActivityService {
    private final ActivityRepository activityRepository;

    @Autowired
    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }
    
    public List<Activity> getManagedActivities(List<Activity> activities) {
        List<Activity> managedActivities = new ArrayList<>();

        for (Activity activity : activities) {
            List<Activity> matchingActivities = getActivitiesByField(activity);
            if (!matchingActivities.isEmpty()) {
                managedActivities.add(matchingActivities.get(0));            
            } else {
                throw new CustomNotFoundException("Activity ID is null for one or more activities");
            }
        }

        return managedActivities;
    }

    private List<Activity> getActivitiesByField(Activity activity) {
        boolean relaxing = activity.isRelaxing();
        boolean adventure = activity.isAdventure();
        boolean groupactivity = activity.isGroupactivity();
        boolean family = activity.isFamily();

        return activityRepository.findByRelaxingAndAdventureAndGroupactivityAndFamily(
            relaxing, adventure, groupactivity, family);
    }


    public List<Destination> getFirstThreeFamilyDestinations() {
        List<Long> destinationIds = activityRepository.findDestinationIdsByFamily();
        if (destinationIds == null || destinationIds.isEmpty()) {
            return Collections.emptyList();
        }
        List<Destination> allFamilyDestinations = activityRepository.findDestinationsByIds(destinationIds);
        if (allFamilyDestinations.size() >= 5) {
            return allFamilyDestinations.subList(0, 5); 
        } else {
            return allFamilyDestinations;
        }
    }
}

