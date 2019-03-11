package com.burnnotice.burnnotice.Models;

import javax.persistence.*;

@Entity
@Table(name="users")
public class User {
    @Id @GeneratedValue
    private long id;

    @Column(nullable = false)
    public String name;

    @Column(nullable = false)
    public String sap;

    @Column(nullable = false)
    public String password;

    @Column(nullable = false)
    boolean chief;

    @Column(nullable = false)
    public String email;

    public User() {
    }

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

    public String getSap() {
        return sap;
    }

    public void setSap(String sap) {
        this.sap = sap;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isChief() {
        return chief;
    }

    public void setChief(boolean chief) {
        this.chief = chief;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
