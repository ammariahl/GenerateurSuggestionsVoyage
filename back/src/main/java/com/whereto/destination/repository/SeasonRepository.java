package com.whereto.destination.repository;


import com.whereto.destination.entity.Season;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface SeasonRepository extends JpaRepository<Season, Long> {
  List<Season> findBySpring(String spring);

    List<Season> findByAutumn(String autumn);

    List<Season> findBySummer(String summer);

    List<Season> findByWinter(String winter);
}
