package com.whereto.destination.repository;


import com.whereto.destination.entity.Activity;
import com.whereto.destination.entity.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findByRelaxingAndAdventureAndGroupactivityAndFamily(
        boolean relaxing, boolean adventure, boolean groupactivity, boolean family);

    @Query("SELECT a.destination.id FROM Activity a WHERE a.family = true")
    List<Long> findDestinationIdsByFamily();

    @Query("SELECT a.destination FROM Activity a WHERE a.destination.id IN :ids")
    List<Destination> findDestinationsByIds(@Param("ids") List<Long> ids);
}
