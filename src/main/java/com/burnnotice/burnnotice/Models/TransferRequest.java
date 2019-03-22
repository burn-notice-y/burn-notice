package com.burnnotice.burnnotice.Models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;

@Entity
@Table(name="transfer_requests")
public class TransferRequest {

    @Id @GeneratedValue
    private long id;

    @Column(nullable=false)
    private String sentDate;

    @Column(nullable=false)
    private String status;



    @OneToOne
    @JsonManagedReference(value = "user")
    private User user;



    // vacancy
    @ManyToOne
    @JoinColumn(name = "vacancy_id")
    private Vacancy vacancy;



    public TransferRequest() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getSentDate() {
        return sentDate;
    }

    public void setSentDate(String sentDate) {
        this.sentDate = sentDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Vacancy getVacancy() {
        return vacancy;
    }

    public void setVacancy(Vacancy vacancy) {
        this.vacancy = vacancy;
    }


}


