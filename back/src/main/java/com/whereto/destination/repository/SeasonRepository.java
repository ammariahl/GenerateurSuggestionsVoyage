package com.whereto.destination.repository;


import com.whereto.destination.entity.Season;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface SeasonRepository extends JpaRepository<Season, Long> {
  List<Season> findBySpring(String spring);

    List<Season> findByAutumn(String autumn);

    List<Season> findBySummer(String summer);

    List<Season> findByWinter(String winter);

    @Query("SELECT DISTINCT s FROM Season s LEFT JOIN FETCH s.destination")
    List<Season> findAllWithDestinations();
}
