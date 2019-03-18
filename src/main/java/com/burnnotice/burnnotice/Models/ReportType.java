package com.burnnotice.burnnotice.Models;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "types" )
public class ReportType {
    @Id @GeneratedValue
    private long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn (name = "report_id")
    private Report report;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Report getReport() {
        return report;
    }

    public void setReport(Report report) {
        this.report = report;
    }

    public ReportType() {
    }
}
