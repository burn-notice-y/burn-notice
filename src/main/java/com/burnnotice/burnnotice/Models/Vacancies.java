package com.burnnotice.burnnotice.Models;

import javax.persistence.*;

public class Vacancies
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


    public Vacancies(boolean engine, String postDate, String fillDate, boolean temporary)
    {
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



}
