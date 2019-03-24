package com.burnnotice.burnnotice.Models;


import javax.persistence.*;

@Entity
@Table(name="assignments")
public class Assignment
{
    @Id
    @GeneratedValue
    private long id;

    @Column(nullable = false)
    private String startDate;

    @Column(nullable = false)
    private String endDate;


    @Column(nullable = false)
    private boolean engine;

    @OneToOne
    private FireStation station;

    @OneToOne
    private User user;

    public Assignment() {
    }

    public Assignment(String startDate, String endDate, boolean engine, FireStation station, User user) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.engine = engine;
        this.station = station;
        this.user = user;
    }

    public long getId()
    {
        return id;
    }

    public void setId(long id)
    {
        this.id = id;
    }

    public String getStartDate()
    {
        return startDate;
    }

    public void setStartDate(String startDate)
    {
        this.startDate = startDate;
    }

    public String getEndDate()
    {
        return endDate;
    }

    public void setEndDate(String endDate)
    {
        this.endDate = endDate;
    }

    public boolean isEngine()
    {
        return engine;
    }

    public void setEngine(boolean engine)
    {
        this.engine = engine;
    }

    public FireStation getStation() {
        return station;
    }

    public void setStation(FireStation station) {
        this.station = station;
    }

    public User getUser()
    {
        return user;
    }

    public void setUser(User user)
    {
        this.user = user;
    }
}
