package com.whereto.destination.service;

import com.whereto.destination.entity.Activity;
import com.whereto.destination.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.whereto.destination.exception.NotFoundException;
import com.whereto.destination.exception.NullIdException;
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
            Long activityId = activity.getId();


            if (activityId != null) {

            Optional<Activity> optionalActivity = activityRepository.findById(activity.getId());
            
                if (optionalActivity.isPresent()) {
                    managedActivities.add(optionalActivity.get());
                } else {
                    throw new NotFoundException("Activity is not found in the database");
                    
                } 
            
        } else {
            throw new NullIdException("Activity ID is null for one or more activities");
        }

        }

        return managedActivities;

    }
}

