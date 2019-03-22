package com.burnnotice.burnnotice.Models;
import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "fire_stations")
public class FireStation {
    @Id @GeneratedValue
    private long id;

    @ManyToOne
    @JoinColumn(name = "district_id")
    private District district;

    @OneToOne
    private User captain;

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(
            name="station_users",
            joinColumns={@JoinColumn(name="station_id")},
            inverseJoinColumns={@JoinColumn(name="user_id")}
    )
    private List<User> currentCrew;

    @OneToMany(mappedBy = "station")
    @JsonBackReference
    private List<Vacancy> vacancies;

    @Column(unique = true)
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

    public List<User> getCurrentCrew() {
        return currentCrew;
    }

    public void setCurrentCrew(List<User> currentCrew) {
        this.currentCrew = currentCrew;
    }

    public List<Vacancy> getVacancies() {
        return vacancies;
    }

    public void setVacancies(List<Vacancy> vacancies) {
        this.vacancies = vacancies;
    }
}
