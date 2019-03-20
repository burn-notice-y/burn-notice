package com.burnnotice.burnnotice.Models;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="reports")
public class Report {

    @Id @GeneratedValue
    private long id;

    @Column(nullable=false)
    private String createDate;

    @Column(nullable=false)
    private String exposedToChemicals;

    @Column(nullable=false)
    private String timeDispatched;

    @Column(nullable=false)
    private String timeArrived;

    @Column(nullable=false)
    private String fireRetardantPresent;

    @Column(nullable=false)
    private String primaryTeamActions;

    @Column(nullable=false)
    private String secondaryTeamActions;

    @Column(nullable=false)
    private String description;

    // one creator of the report
    @OneToOne
    private User creator;

    //type of report being submitted
    @OneToOne
    private ReportType type;

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(
            name="reports_users",
            joinColumns={@JoinColumn(name="report_id")},
            inverseJoinColumns={@JoinColumn(name="user_id")}
    )
    private List<User> users;

    public Report() { }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getExposedToChemicals() {
        return exposedToChemicals;
    }

    public void setExposedToChemicals(String exposedToChemicals) {
        this.exposedToChemicals = exposedToChemicals;
    }

    public String getTimeDispatched() {
        return timeDispatched;
    }

    public void setTimeDispatched(String timeDispatched) {
        this.timeDispatched = timeDispatched;
    }

    public String getTimeArrived() {
        return timeArrived;
    }

    public void setTimeArrived(String timeArrived) {
        this.timeArrived = timeArrived;
    }

    public String getFireRetardantPresent() {
        return fireRetardantPresent;
    }

    public void setFireRetardantPresent(String fireRetardantPresent) {
        this.fireRetardantPresent = fireRetardantPresent;
    }

    public String getPrimaryTeamActions() {
        return primaryTeamActions;
    }

    public void setPrimaryTeamActions(String primaryTeamActions) {
        this.primaryTeamActions = primaryTeamActions;
    }

    public String getSecondaryTeamActions() {
        return secondaryTeamActions;
    }

    public void setSecondaryTeamActions(String secondaryTeamActions) {
        this.secondaryTeamActions = secondaryTeamActions;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public ReportType getType() {
        return type;
    }

    public void setType(ReportType type) {
        this.type = type;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
