package com.burnnotice.burnnotice.Controllers;

import com.burnnotice.burnnotice.Models.FireStation;
import com.burnnotice.burnnotice.Models.User;
import com.burnnotice.burnnotice.Repositories.FireStationRepository;
import com.burnnotice.burnnotice.Repositories.StationHighlights;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class FireStationController {
    FireStationRepository stationDao;

    public FireStationController(FireStationRepository stationDao){
        this.stationDao = stationDao;
    }

    @PostMapping("/api/create-station")
    public void createStation(@RequestBody FireStation station){
        stationDao.save(station);
        for (User user : station.getCurrentCrew()){
            user.getStations().add(station);
        }
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
