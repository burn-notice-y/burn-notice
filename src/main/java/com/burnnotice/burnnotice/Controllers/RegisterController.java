package com.burnnotice.burnnotice.Controllers;

import com.burnnotice.burnnotice.Models.User;
import com.burnnotice.burnnotice.Repositories.RegisterRepository;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Optional;

@RestController
public class RegisterController {
    private final RegisterRepository registerDao;

    public RegisterController(RegisterRepository registerDao){
        this.registerDao = registerDao;
    }

    @PostMapping("/api/register")
    public void register(@RequestBody User newUser, HttpServletRequest request){
        HttpSession session = request.getSession();
        registerDao.save(newUser);

        session.setAttribute("authUser", newUser);
    }

}
