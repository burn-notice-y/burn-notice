package com.burnnotice.burnnotice.Models;


import javax.persistence.*;

@Entity
@Table(name="Assignments")
public class Assignments
{
    @Id
    @GeneratedValue
    private long id;

    @Column(nullable = false)
    private String startDate;

    @Column(nullable = false)
    private String endDate;

    @Column(nullable = false)
    private long station;

    @Column(nullable = false)
    private boolean engine;

//    @OneToMany
//    @JoinColumn (name = user_id);
//    private Assignments assignments;





    public Assignments()
    {
    }

    public Assignments(String startDate, String endDate, long station, boolean engine)
    {
        this.startDate = startDate;
        this.endDate = endDate;
        this.station = station;
        this.engine = engine;
//        this.assignments = assignments;
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

    public long getStation()
    {
        return station;
    }

    public void setStation(long station)
    {
        this.station = station;
    }

    public boolean isEngine()
    {
        return engine;
    }

    public void setEngine(boolean engine)
    {
        this.engine = engine;
    }

//    public Assignments getAssignments()
//    {
//        return assignments;
//    }
//
//    public void setAssignments(Assignments assignments)
//    {
//        this.assignments = assignments;
//    }
}
