package com.burnnotice.burnnotice.Models;

import com.burnnotice.burnnotice.util.Password;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="users")
public class User {
    @Id @GeneratedValue
    private long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable=false)
    private boolean eligibleForTransfer = true;

    @Column(nullable = false, unique=true)
    private String sap;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private boolean chief = false;

    @Column(nullable = false)
    private String email;

    @OneToMany(mappedBy = "user")
    @JsonBackReference(value = "report")
    private List<UserReport> reports;

    public User() { }

    public User(long id){
        this.id = id;
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
        this.password = Password.encrypt(password);
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

    public List<UserReport> getReports() {
        return reports;
    }

    public void setReports(List<UserReport> reports) {
        this.reports = reports;
    }
}
