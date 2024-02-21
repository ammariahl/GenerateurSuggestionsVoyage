package com.whereto.destination.repository;


import com.whereto.destination.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {
   List<Budget> findByLittleBudgetAndMediumBudgetAndBigBudgetAndUnlimited(
            boolean littleBudget, boolean mediumBudget, boolean bigBudget, boolean unlimited);

   // @Query("SELECT DISTINCT b FROM Budget b LEFT JOIN FETCH b.destinations")
   // List<Budget> findAllWithDestinations();
}
