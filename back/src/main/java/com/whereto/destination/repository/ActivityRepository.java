package com.whereto.destination.repository;


import com.whereto.destination.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
   List<Activity> findByRelaxingAndAdventureAndGroupactivityAndFamily(
            boolean relaxing, boolean adventure, boolean groupactivity, boolean family);
}
