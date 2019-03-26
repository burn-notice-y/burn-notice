package com.burnnotice.burnnotice.Controllers;

import com.burnnotice.burnnotice.Models.FireStation;
import com.burnnotice.burnnotice.Models.User;
import com.burnnotice.burnnotice.Repositories.FireStationRepository;
import com.burnnotice.burnnotice.Repositories.RegisterRepository;
import com.burnnotice.burnnotice.Repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Optional;

@RestController
public class RegisterController {
    private final RegisterRepository registerDao;
    private final FireStationRepository stationDao;
    private final UserRepository userDao;

    public RegisterController(RegisterRepository registerDao, FireStationRepository stationDao, UserRepository userDao){
        this.registerDao = registerDao;
        this.userDao = userDao;
        this.stationDao = stationDao;
    }

    @PostMapping("/api/register")
    public void register(@RequestBody User newUser, HttpServletRequest request){
        HttpSession session = request.getSession();
        registerDao.save(newUser);

        session.setAttribute("authUser", newUser);
    }
    @PostMapping("/api/add-station")
    public void addStation(@RequestParam String stationName){
        FireStation station = stationDao.findByName(stationName);
        User newMember = userDao.getFirstById();
        station.getCurrentCrew().add(newMember);
        stationDao.save(station);
    }

}
