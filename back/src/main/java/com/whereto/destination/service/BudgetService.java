package com.whereto.destination.service;

import com.whereto.destination.entity.Budget;
import com.whereto.destination.entity.Destination;
import com.whereto.destination.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.whereto.destination.exception.CustomNotFoundException;
import java.util.Collections;

@Service
public class BudgetService {
    private final BudgetRepository budgetRepository;

    @Autowired
    public BudgetService(BudgetRepository budgetRepository) {
        this.budgetRepository = budgetRepository;
    }

    //  public List<Budget> getAllBudgetsWithDestinations() {
    //     return budgetRepository.findAllWithDestinations();
    
    //  }
    public List<Budget> getManagedBudgets(List<Budget> budgets) {
          List<Budget> managedBudgets = new ArrayList<>();
          for (Budget budget : budgets) {
            List<Budget> matchingBudgets = getBudgetsByField(budget);
            
            if (!matchingBudgets.isEmpty()) {
                managedBudgets.add(matchingBudgets.get(0));
            } else {
                throw new CustomNotFoundException("Budget is not found in the database");
            }
        }

        return managedBudgets;

    }
  private List<Budget> getBudgetsByField(Budget budget) {
        boolean littleBudget = budget.isLittleBudget();
        boolean mediumBudget = budget.isMediumBudget();
        boolean bigBudget = budget.isBigBudget();
        boolean unlimited = budget.isUnlimited();

        return budgetRepository.findByLittleBudgetAndMediumBudgetAndBigBudgetAndUnlimited(
            littleBudget, mediumBudget, bigBudget, unlimited);
    }

       public List<Destination> getFirstThreeBudgetDestinations() {
        List<Long> destinationIds = budgetRepository.findDestinationIdsByBudget();
        if (destinationIds == null || destinationIds.isEmpty()) {
        return Collections.emptyList();
    }
        List<Destination> allBudgetDestinations = budgetRepository.findDestinationsByIds(destinationIds);

        if (allBudgetDestinations.size() >= 4) {
        return allBudgetDestinations.subList(0, 4); 
    } else {
        return allBudgetDestinations;
    }
    }

}

