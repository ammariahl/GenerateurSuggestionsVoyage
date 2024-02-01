package com.whereto.destination.entity;


import javax.persistence.ManyToMany;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.Id;
import java.util.List;
import java.util.ArrayList;

@Entity
public class Destination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String image;
    private String descriptionShort;
    private String descriptionLong;

    @ManyToMany
    @JoinTable(
        name = "destination_season",
        joinColumns = @JoinColumn(name = "destination_id"),
        inverseJoinColumns = @JoinColumn(name = "season_id")
    )
    private List<Season> seasons = new ArrayList<>();

    @ManyToMany
     @JoinTable(
        name = "destination_budget",
        joinColumns = @JoinColumn(name = "destination_id"),
        inverseJoinColumns = @JoinColumn(name = "budget_id")
    )
    private List<Budget> budgets = new ArrayList<>();

    @ManyToMany
        @JoinTable(
        name = "destination_activity",
        joinColumns = @JoinColumn(name = "destination_id"),
        inverseJoinColumns = @JoinColumn(name = "activity_id")
    )
    private List<Activity> activities = new ArrayList<>();

    @ManyToMany
     @JoinTable(
        name = "destination_document",
        joinColumns = @JoinColumn(name = "destination_id"),
        inverseJoinColumns = @JoinColumn(name = "document_id")
    )
    private List<Document> documents = new ArrayList<>();

 
    public Destination() {
     
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescriptionShort() {
        return descriptionShort;
    }

    public void setDescriptionShort(String descriptionShort) {
        this.descriptionShort = descriptionShort;
    }

    public String getDescriptionLong() {
        return descriptionLong;
    }

    public void setDescriptionLong(String descriptionLong) {
        this.descriptionLong = descriptionLong;
    }

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
        this.budgets = budgets;    }



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
