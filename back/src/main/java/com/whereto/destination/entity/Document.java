package com.whereto.destination.entity;


import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private boolean cniUe;
    private boolean passportUe;
    private boolean visaUe;
    private boolean passportMde;

   
    @ManyToMany
    @JoinTable(
        name = "document_destination",
        joinColumns = @JoinColumn(name = "document_id"),
        inverseJoinColumns = @JoinColumn(name = "destination_id")
        )
    private List<Destination> destinations = new ArrayList<>();
   

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

    public List<Destination> getDestinations() {
            return destinations;
        }

        public void setDestinations(List<Destination> destinations) {
            this.destinations = destinations;
        }
}
