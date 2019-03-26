package com.burnnotice.burnnotice.Controllers;

import com.burnnotice.burnnotice.Models.Assignment;
import com.burnnotice.burnnotice.Models.FireStation;
import com.burnnotice.burnnotice.Models.User;
import com.burnnotice.burnnotice.Repositories.AssignmentRepository;
import com.burnnotice.burnnotice.Repositories.FireStationRepository;
import com.burnnotice.burnnotice.Repositories.RegisterRepository;
import com.burnnotice.burnnotice.Repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

@RestController
public class RegisterController {
    private final RegisterRepository registerDao;
    private final FireStationRepository stationDao;
    private final UserRepository userDao;
    private final AssignmentRepository assignmentDao;

    public RegisterController(RegisterRepository registerDao, FireStationRepository stationDao, UserRepository userDao, AssignmentRepository assignmentDao){
        this.registerDao = registerDao;
        this.assignmentDao = assignmentDao;
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
        User newMember = userDao.findFirstByOrderByIdDesc();
        System.out.println(newMember.getFirstName());
        station.getCurrentCrew().add(newMember);
        stationDao.save(station);

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Assignment newAssignment =
                new Assignment(dateFormat.format(new Date()), "9999", false, station, newMember);
        assignmentDao.save(newAssignment);
    }

}
