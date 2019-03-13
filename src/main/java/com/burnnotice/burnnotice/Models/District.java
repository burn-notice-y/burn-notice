package com.burnnotice.burnnotice.Models;

import javax.persistence.*;

@Entity
@Table(name = "districts")
public class District {
    @Id @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String name;

    @OneToOne
    private User user;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public District() {
    }
}
