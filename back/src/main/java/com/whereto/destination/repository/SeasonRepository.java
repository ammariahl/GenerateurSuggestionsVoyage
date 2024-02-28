package com.whereto.destination.repository;


import com.whereto.destination.entity.Season;
import org.springframework.data.jpa.repository.JpaRepository;
import com.whereto.destination.entity.Destination;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface SeasonRepository extends JpaRepository<Season, Long> {
    List<Season> findBySpring(String spring);
    List<Season> findByAutumn(String autumn);
    List<Season> findBySummer(String summer);
    List<Season> findByWinter(String winter);

    @Query("SELECT a.destination.id FROM Season a WHERE a.spring <> '0'")
    List<Long> findDestinationIdsBySpring();

    @Query("SELECT a.destination FROM Season a WHERE a.id IN :ids")
    List<Destination> findDestinationsByIds(@Param("ids") List<Long> ids);
}
