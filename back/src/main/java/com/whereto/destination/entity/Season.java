package com.whereto.destination.entity;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.List;

@Entity
public class Season {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String climat;

    @ManyToMany(mappedBy = "season")
    private List<Destination> destinations;

   
    public Season() {
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClimat() {
        return climat;
    }

    public void setClimet(String climat) {
        this.climat = climat;
    }

    

    public List<Destination> getDestinations() {
        return destinations;
    }

    public void setDestinations(List<Destination> destinations) {
        this.destinations = destinations;
    }
}