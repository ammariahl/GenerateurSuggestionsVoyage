package com.whereto.destination.entity;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.List;



@Entity
public class Weather {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private boolean hot;
    private boolean cool;
    private boolean hotAndCool;
    private boolean anything;

    @OneToMany(mappedBy = "weather")
    private List<Destination> destinations;

    public Weather() {
        
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isHot() {
        return hot;
    }

    public void setHot(boolean hot) {
        this.hot = hot;
    }

    public boolean isCool() {
        return cool;
    }

    public void setCool(boolean cool) {
        this.cool = cool;
    }

    public boolean isHotAndCool() {
        return hotAndCool;
    }

    public void setHotAndCool(boolean hotAndCool) {
        this.hotAndCool = hotAndCool;
    }

    public boolean isAnything() {
        return anything;
    }

    public void setAnything(boolean anything) {
        this.anything = anything;
    }

    public List<Destination> getDestinations() {
        return destinations;
    }

    public void setDestinations(List<Destination> destinations) {
        this.destinations = destinations;
    }
}