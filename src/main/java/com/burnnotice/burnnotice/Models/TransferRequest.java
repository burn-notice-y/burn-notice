package com.burnnotice.burnnotice.Models;

import javax.annotation.Generated;
import javax.persistence.*;

@Entity
@Table(name="transfer_req")
public class TransferRequest {

    @Id @GeneratedValue
    private long id;

    @Column(nullable=false)
    private String sentDate;

    @Column(nullable=false)
    private String status;

//    @OneToOne
//    @JoinColumn (name="user_id");
//    private TransferRequest transferRequest;

//    @OneToOne
//    @JoinColumn(name="desired_station");
//    private TransferRequest transferRequest;


    public TransferRequest() {

    }

    public TransferRequest(String sentDate, String status) {
        this.sentDate = sentDate;
        this.status = status;
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
}


