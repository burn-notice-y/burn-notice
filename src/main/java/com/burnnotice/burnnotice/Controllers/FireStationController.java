package com.burnnotice.burnnotice.Controllers;

import com.burnnotice.burnnotice.Models.FireStation;
import com.burnnotice.burnnotice.Models.User;
import com.burnnotice.burnnotice.Repositories.FireStationRepository;
import com.burnnotice.burnnotice.Repositories.StationHighlights;
import com.burnnotice.burnnotice.Repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class FireStationController {
    FireStationRepository stationDao;
    UserRepository userDao;


    public FireStationController(FireStationRepository stationDao, UserRepository userDao){
        this.userDao = userDao;
        this.stationDao = stationDao;
    }

    @PostMapping("/api/create-station")
    public void createStation(@RequestBody FireStation station){
        stationDao.save(station);
        for (User user : station.getCurrentCrew()){
            user.getStations().add(station);
        }
    }

    @PostMapping("/api/update-station")
    public void updateStation(@RequestBody FireStation updatedStation) {
        FireStation dbFire = stationDao.findOne(updatedStation.getId());
        List<User> newCrew = new ArrayList<>();
        for (User user : updatedStation.getCurrentCrew()) {
            User foundUser = userDao.findOne(user.getId());
            foundUser.getStations().add(updatedStation);
            newCrew.add(user);
        }
        dbFire.setCurrentCrew(newCrew);
        stationDao.save(dbFire);
    }

    @GetMapping("/api/stations")
    public Iterable<StationHighlights> getAll(){
        return stationDao.findAllBy();
    }

    @GetMapping("/api/one-station")
    public FireStation findById(@RequestParam Long id ){
        return stationDao.findOne(id);
    }

}
