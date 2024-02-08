package com.whereto.destination.service;

import com.whereto.destination.entity.Budget;
import com.whereto.destination.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BudgetService {
    private final BudgetRepository budgetRepository;

    @Autowired
    public BudgetService(BudgetRepository budgetRepository) {
        this.budgetRepository = budgetRepository;
    }

    public List<Budget> getManagedBudgets(List<Budget> budgets) {
          List<Budget> managedBudgets = new ArrayList<>();
          for (Budget budget : budgets) {
            Optional<Budget> optionalBudget = budgetRepository.findById(budget.getId());
            
            if (optionalBudget.isPresent()) {
                managedBudgets.add(optionalBudget.get());
            } else {
                // Handle the case when the season is not found in the database
                // throw an exception 
            }
        }

        return managedBudgets;

    }
}

