package com.whereto.destination.entity;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.List;

@Entity
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private boolean littleBudget;
    private boolean mediumBudget;
    private boolean bigBudget;
    private boolean unlimited;

    @ManyToMany(mappedBy = "budget")
    private List<Destination> destinations;

   public Budget() {
       
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isLittleBudget() {
        return littleBudget;
    }

    public void setLittleBudget(boolean littleBudget) {
        this.littleBudget = littleBudget;
    }

    public boolean isMediumBudget() {
        return mediumBudget;
    }

    public void setMediumBudget(boolean mediumBudget) {
        this.mediumBudget = mediumBudget;
    }

    public boolean isBigBudget() {
        return bigBudget;
    }

    public void setBigBudget(boolean bigBudget) {
        this.bigBudget = bigBudget;
    }

    public boolean isUnlimited() {
        return unlimited;
    }

    public void setUnlimited(boolean unlimited) {
        this.unlimited = unlimited;
    }

    public List<Destination> getDestinations() {
        return destinations;
    }

    public void setDestinations(List<Destination> destinations) {
        this.destinations = destinations;
    }
}
