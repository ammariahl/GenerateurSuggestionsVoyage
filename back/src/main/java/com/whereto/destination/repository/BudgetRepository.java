package com.whereto.destination.repository;


import com.whereto.destination.entity.Budget;
import com.whereto.destination.entity.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findByLittleBudgetAndMediumBudgetAndBigBudgetAndUnlimited(
        boolean littleBudget, boolean mediumBudget, boolean bigBudget, boolean unlimited);

    @Query("SELECT a.destination.id FROM Budget a WHERE a.littleBudget <> '0'")
    List<Long> findDestinationIdsByBudget();

    @Query("SELECT a.destination FROM Budget a WHERE a.id IN :ids")
    List<Destination> findDestinationsByIds(@Param("ids") List<Long> ids);
}
