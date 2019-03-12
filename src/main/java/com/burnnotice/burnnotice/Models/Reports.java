package com.burnnotice.burnnotice.Models;


import javax.persistence.*;

@Entity
@Table(name="reports")
public class Reports {

    @Id @GeneratedValue
    private long id;

    @Column
    private String createDate;

    @Column
    private String exposedToChemicals;

    @Column
    private String timeDispatched;

    @Column
    private String timeArrived;

    @Column
    private String fireRetardantPresent;

    @Column
    private String primaryTeamActions;

    @Column
    private String secondaryTeamActions;

    @Column
    private String description;
}
