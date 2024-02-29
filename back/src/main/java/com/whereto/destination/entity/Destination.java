package com.whereto.destination.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.List;
import java.util.ArrayList;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.FetchType;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import org.hibernate.annotations.BatchSize;


@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Destination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @Column(columnDefinition = "TEXT")
    private String image;

    @Column(columnDefinition = "TEXT")
    private String descriptionShort;

    @Column(columnDefinition = "TEXT")
    private String descriptionLong;
    
    @OneToMany(mappedBy = "destination" , fetch = FetchType.LAZY)
    @BatchSize(size = 10)
    @Fetch(FetchMode.SUBSELECT)
    private List<Season> seasons ;
    
    @OneToMany(mappedBy = "destination", fetch = FetchType.LAZY )
    @BatchSize(size = 10)
    @Fetch(FetchMode.SUBSELECT)
    private List<Budget> budgets ;
   
    @OneToMany(mappedBy = "destination", fetch = FetchType.LAZY )
    @BatchSize(size = 10)
    @Fetch(FetchMode.SUBSELECT)
    private List<Activity> activities ;
    
    @OneToMany(mappedBy = "destination", fetch = FetchType.LAZY  )
    @BatchSize(size = 10)
    @Fetch(FetchMode.SUBSELECT)
    private List<Document> documents ;
   
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
