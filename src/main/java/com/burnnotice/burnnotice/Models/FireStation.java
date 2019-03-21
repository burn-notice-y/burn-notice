package com.burnnotice.burnnotice.Models;
import javax.persistence.*;

@Entity
@Table(name = "fire_stations")
public class FireStation {
    @Id @GeneratedValue
    private long id;

    @OneToOne(cascade = {CascadeType.ALL})
    private District district;

    @OneToOne
    private User captain;

    private String name;

    public FireStation() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }

    public User getCaptain() {
        return captain;
    }

    public void setCaptain(User captain) {
        this.captain = captain;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
