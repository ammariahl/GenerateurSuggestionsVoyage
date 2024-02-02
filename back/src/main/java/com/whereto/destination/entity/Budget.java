package com.whereto.destination.entity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.GeneratedValue;
import javax.persistence.JoinColumn;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.CascadeType;
import javax.persistence.FetchType;

@Entity
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private boolean littleBudget;
    private boolean mediumBudget;
    private boolean bigBudget;
    private boolean unlimited;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "destinaton_id")
    private Destination destination;

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

    public Destination getDestination() {
        return destination;
    }

    public void setDestination(Destination destination) {
        this.destination = destination;
    }
}
