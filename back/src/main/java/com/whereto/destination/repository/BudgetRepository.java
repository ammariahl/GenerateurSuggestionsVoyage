package com.whereto.destination.repository;


import com.whereto.destination.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {
   List<Budget> findByLittleBudgetAndMediumBudgetAndBigBudgetAndUnlimited(
            boolean littleBudget, boolean mediumBudget, boolean bigBudget, boolean unlimited);
}
