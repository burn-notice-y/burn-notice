package com.burnnotice.burnnotice.Controllers;

import com.burnnotice.burnnotice.Models.User;
import com.burnnotice.burnnotice.Repositories.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FirefighterController {
    private final UserRepository userDao;

    public FirefighterController(UserRepository userDao) {
        this.userDao = userDao;
    }

    @GetMapping("/api/firefighters")
    public List<User> findFirefighters(@RequestParam("search") String search){
        return userDao.findUsersByName(search);
    }
}
