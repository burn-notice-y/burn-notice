package com.burnnotice.burnnotice.Models;

import javax.persistence.*;

@Entity
@Table(name = "types" )
public class ReportType {
    @Id @GeneratedValue
    private long id;

    @Column(nullable = false)
    private String name;

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

    public ReportType() {
    }
}
