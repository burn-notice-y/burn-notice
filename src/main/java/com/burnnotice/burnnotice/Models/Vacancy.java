package com.burnnotice.burnnotice.Models;

import javax.persistence.*;

@Entity
@Table(name = "vacancies")
public class Vacancy
{
    @Id
    @GeneratedValue
    private long id;


    @OneToOne
    private FireStation station;


    @OneToOne
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



    public Vacancy(FireStation station, FireStation district, boolean engine, String postDate, String fillDate, boolean temporary)
    {
        this.station = station;
        this.district = district;
        this.engine = engine;
        this.postDate = postDate;
        this.fillDate = fillDate;
        this.temporary = temporary;
    }

    public Vacancy(long id, FireStation station, FireStation district, boolean engine, String postDate, String fillDate, boolean temporary)
    {
        this.id = id;
        this.station = station;
        this.district = district;
        this.engine = engine;
        this.postDate = postDate;
        this.fillDate = fillDate;
        this.temporary = temporary;
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
