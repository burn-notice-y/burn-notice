package com.burnnotice.burnnotice.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "vacancies")
public class Vacancy {
    @Id
    @GeneratedValue
    private long id;

    @Column
    private boolean engine;

    @Column
    private String postDate;

    @Column
    private String fillDate;

    @Column
    private boolean temporary;

    @OneToOne(cascade = {CascadeType.ALL})
    private FireStation station;

    // mapped relationship to vacancy
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "vacancy")
    @JsonBackReference
    private List<TransferRequest> transferRequest;


    @OneToOne(cascade = {CascadeType.ALL})
    private FireStation district;


    public Vacancy() {
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean isEngine() {
        return engine;
    }

    public void setEngine(boolean engine) {
        this.engine = engine;
    }

    public String getPostDate() {
        return postDate;
    }

    public void setPostDate(String postDate) {
        this.postDate = postDate;
    }

    public String getFillDate() {
        return fillDate;
    }

    public void setFillDate(String fillDate) {
        this.fillDate = fillDate;
    }

    public boolean isTemporary() {
        return temporary;
    }

    public void setTemporary(boolean temporary) {
        this.temporary = temporary;
    }

    public FireStation getStation() {
        return station;
    }

    public void setStation(FireStation station) {
        this.station = station;
    }

    public FireStation getDistrict() {
        return district;
    }

    public void setDistrict(FireStation district) {
        this.district = district;
    }

    public List<TransferRequest> getTransferRequest() {
        return transferRequest;
    }

    public void setTransferRequest(List<TransferRequest> transferRequest) {
        this.transferRequest = transferRequest;
    }
}
