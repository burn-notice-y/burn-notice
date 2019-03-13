package com.burnnotice.burnnotice.Controllers;

import com.burnnotice.burnnotice.Models.User;
import com.burnnotice.burnnotice.Repositories.RegisterRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class RegisterController {
    private final RegisterRepository registerDao;

    public RegisterController(RegisterRepository registerDao){
        this.registerDao = registerDao;
    }

    @PostMapping("api/register")
    public void register(@RequestBody User newUser){
        registerDao.save(newUser);
    }

}
