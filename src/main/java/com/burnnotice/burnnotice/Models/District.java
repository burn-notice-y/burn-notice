package com.burnnotice.burnnotice.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "districts")
public class District {
    @Id @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String name;

    @OneToOne
    private User chief;

    @OneToMany(cascade = CascadeType.MERGE, mappedBy = "district")
    @JsonBackReference
    private List<FireStation> stationList;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getChief() {
        return chief;
    }

    public void setUser(User chief) {
        this.chief = chief;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setChief(User chief) {
        this.chief = chief;
    }

    public List<FireStation> getStationList() {
        return stationList;
    }

    public void setStationList(List<FireStation> stationList) {
        this.stationList = stationList;
    }

    public District() { }

}
