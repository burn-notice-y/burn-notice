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
}
