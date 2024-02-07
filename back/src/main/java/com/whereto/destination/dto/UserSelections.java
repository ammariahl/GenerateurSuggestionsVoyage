package com.whereto.destination.dto;

import org.springframework.stereotype.Component;
import com.whereto.destination.entity.Budget;
import com.whereto.destination.entity.Document;
import com.whereto.destination.entity.Season;
import com.whereto.destination.entity.Activity;
import java.util.List;
import javax.persistence.Id;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.annotation.JsonManagedReference;



public class UserSelections {

    private List<Season> seasons;

    private List<Budget> budgets;

    private List<Activity> activities;

    private List<Document> documents;


       public List<Season> getSeasons() {
        return seasons;
    }

    public void setSeasons(List<Season> seasons) {
        this.seasons = seasons;
    }

    public List<Budget> getBudgets() {
        return budgets;
    }

    public void setBudgets(List<Budget> budgets) {
        this.budgets = budgets;
    }

    public List<Activity> getActivities() {
        return activities;
    }

    public void setActivities(List<Activity> activities) {
        this.activities = activities;
    }

    public List<Document> getDocuments() {
        return documents;
    }

    public void setDocuments(List<Document> documents) {
        this.documents = documents;
    }
}