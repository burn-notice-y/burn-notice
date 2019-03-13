package com.burnnotice.burnnotice.Models;

import javax.persistence.*;

@Entity
@Table(name="users")
public class User {
    @Id @GeneratedValue
    private long id;

    @Column(nullable = false)
    public String firstName;

    @Column(nullable = false)
    public String lastName;

    @Column(nullable=false)
    public boolean eligibleForTransfer;


    @Column(nullable = false, unique = true)
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

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public boolean isEligibleForTransfer() {
        return eligibleForTransfer;
    }

    public void setEligibleForTransfer(boolean eligibleForTransfer) {
        this.eligibleForTransfer = eligibleForTransfer;
    }
}
