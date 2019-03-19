package com.burnnotice.burnnotice.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import javax.persistence.*;

@Entity
@Table(name = "user_report")
public class UserReport {

    @Id
    @GeneratedValue
    private long id;

    @ManyToOne

    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "report_id")
    private Report report;

    @Column(nullable = false)
    private String teamNumber;

    public UserReport(){}

    public UserReport(User user, Report report, String teamNumber) {
        this.user = user;
        this.report = report;
        this.teamNumber = teamNumber;
    }

    public UserReport(User user) {
        this.user = user;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Report getReport() {
        return report;
    }

    public void setReport(Report report) {
        this.report = report;
    }

    public String getTeamNumber() {
        return teamNumber;
    }

    public void setTeamNumber(String teamNumber) {
        this.teamNumber = teamNumber;
    }
}
