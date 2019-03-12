package com.burnnotice.burnnotice.Models;


import org.hibernate.annotations.Filter;

import javax.persistence.*;
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
    private User user;

    //type of report being submitted
    @OneToOne
    private ReportType type;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "report_to_teams")
    @Filter(name="team_number", condition=":teamNumber=1")
    private List<ReportType> types;



    public Report() {

    }

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ReportType getType() {
        return type;
    }

    public void setType(ReportType type) {
        this.type = type;
    }


    public List<ReportType> getTypes() {
        return types;
    }

    public void setTypes(List<ReportType> types) {
        this.types = types;
    }
}
