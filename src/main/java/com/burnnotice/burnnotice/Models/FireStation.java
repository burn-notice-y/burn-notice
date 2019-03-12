package com.burnnotice.burnnotice.Models;
import javax.persistence.*;

@Entity
@Table(name = "fire_stations")
public class FireStation {
    @Id @GeneratedValue
    private long id;

//    @OneToOne
//    private District district;

    @OneToOne
    private User user;

    public FireStation() {
    }
}
