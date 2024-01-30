package com.whereto.destination.entity;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.List;

@Entity
public class Season {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private boolean printemps;
    private boolean automn;
    private boolean hiver;
    private boolean ete;

    @OneToMany(mappedBy = "season")
    private List<Destination> destinations;

   
    public Season() {
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isPrintemps() {
        return printemps;
    }

    public void setPrintemps(boolean printemps) {
        this.printemps = printemps;
    }

    public boolean isAutomn() {
        return automn;
    }

    public void setAutomn(boolean automn) {
        this.automn = automn;
    }

    public boolean isHiver() {
        return hiver;
    }

    public void setHiver(boolean hiver) {
        this.hiver = hiver;
    }

    public boolean isEte() {
        return ete;
    }

    public void setEte(boolean ete) {
        this.ete = ete;
    }

    public List<Destination> getDestinations() {
        return destinations;
    }

    public void setDestinations(List<Destination> destinations) {
        this.destinations = destinations;
    }
}