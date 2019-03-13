package com.burnnotice.burnnotice.Models;

import javax.persistence.*;

@Entity
@Table(name = "vacancies")
public class Vacancy
{
    @Id
    @GeneratedValue
    private long id;

    @OneToOne(cascade = {CascadeType.ALL})
    private FireStation station;


    @OneToOne(cascade = {CascadeType.ALL})
    private FireStation district;

    @Column
    private boolean engine;

    @Column
    private String postDate;

    @Column
    private String fillDate;

    @Column
    private boolean temporary;


    public Vacancy()
    {
    }

    public long getId()
    {
        return id;
    }

    public void setId(long id)
    {
        this.id = id;
    }

    public boolean isEngine()
    {
        return engine;
    }

    public void setEngine(boolean engine)
    {
        this.engine = engine;
    }

    public String getPostDate()
    {
        return postDate;
    }

    public void setPostDate(String postDate)
    {
        this.postDate = postDate;
    }

    public String getFillDate()
    {
        return fillDate;
    }

    public void setFillDate(String fillDate)
    {
        this.fillDate = fillDate;
    }

    public boolean isTemporary()
    {
        return temporary;
    }

    public void setTemporary(boolean temporary)
    {
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
}
