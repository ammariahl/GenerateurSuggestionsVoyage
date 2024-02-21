package com.whereto.destination.entity;


import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonBackReference;
import javax.persistence.FetchType;

@Entity
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private boolean cniUe;
    private boolean passportUe;
    private boolean visaUe;
    private boolean passportMde;

    
    @ManyToOne
    @JoinColumn(name = "destination_id")
    private Destination destination;
   

    public Document() {
        
    }

  

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isCniUe() {
        return cniUe;
    }

    public void setCniUe(boolean cniUe) {
        this.cniUe = cniUe;
    }

    public boolean isPassportUe() {
        return passportUe;
    }

    public void setPassportUe(boolean passportUe) {
        this.passportUe = passportUe;
    }

    public boolean isVisaUe() {
        return visaUe;
    }

    public void setVisaUe(boolean visaUe) {
        this.visaUe = visaUe;
    }

    public boolean isPassportMde() {
        return passportMde;
    }

    public void setPassportMde(boolean passportMde) {
        this.passportMde = passportMde;
    }

    public Destination getDestination() {
        return destination;
    }

    public void setDestination(Destination destination) {
        this.destination = destination;
    }
}
