package com.whereto.destination.entity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Id;
import com.fasterxml.jackson.annotation.JsonBackReference;
import javax.persistence.FetchType;

@Entity
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private boolean relaxing;
    private boolean adventure;
    private boolean groupactivity;
    private boolean family;
    
    @ManyToOne
    @JoinColumn(name = "destination_id")
    private Destination destination;

    public Activity() {      
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isRelaxing() {
        return relaxing;
    }

    public void setRelaxing(boolean relaxing) {
        this.relaxing = relaxing;
    }

    public boolean isAdventure() {
        return adventure;
    }

    public void setAdventure(boolean adventure) {
        this.adventure = adventure;
    }

    public boolean isGroupactivity() {
        return groupactivity;
    }

    public void setGroupactivity(boolean groupactivity) {
        this.groupactivity = groupactivity;
    }

    public boolean isFamily() {
        return family;
    }

    public void setFamily(boolean family) {
        this.family = family;
    }

    public Destination getDestination() {
        return destination;
    }

    public void setDestination(Destination destination) {
        this.destination = destination;
    }
}
