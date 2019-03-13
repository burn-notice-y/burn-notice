package com.burnnotice.burnnotice.Models;
import javax.persistence.*;

@Entity
@Table(name = "fire_stations")
public class FireStation {
    @Id @GeneratedValue
    private long id;

    @OneToOne(cascade = {CascadeType.ALL})
    private District district;

    @OneToOne
    private User user;

    public FireStation() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
