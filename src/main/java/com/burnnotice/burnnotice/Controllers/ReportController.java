package com.burnnotice.burnnotice.Controllers;


import com.burnnotice.burnnotice.Models.Report;
import com.burnnotice.burnnotice.Models.User;
import com.burnnotice.burnnotice.Repositories.ReportRepository;
import com.burnnotice.burnnotice.Repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ReportController {

    private final ReportRepository reportDao;
    private final UserRepository userDao;


    public ReportController(ReportRepository reportDao, UserRepository userDao ) {
        this.reportDao = reportDao;
        this.userDao = userDao;
    }

    @PostMapping("/api/create-report")
    public void createReport(@RequestBody Report report) {
        List<User> users = new ArrayList<User>();
        for (User user : report.getUsers()){
            users.add(user);
        }
        report.setUsers(users);

        reportDao.save(report);
    }

    // find all - return Iterable<Report>
    @GetMapping("/api/reports")
    public Iterable<Report> findAll() {

        return reportDao.findAll();
    }
}
