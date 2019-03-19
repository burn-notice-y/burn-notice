package com.burnnotice.burnnotice.Controllers;


import com.burnnotice.burnnotice.Models.Report;
import com.burnnotice.burnnotice.Models.User;
import com.burnnotice.burnnotice.Repositories.ReportRepository;
import com.burnnotice.burnnotice.Repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class ReportController {

    private final ReportRepository reportDao;
    private final UserRepository userDao;

    public ReportController(ReportRepository reportDao, UserRepository userDao) {
        this.reportDao = reportDao;
        this.userDao = userDao;
    }

    @PostMapping("/api/create-report")
    public void createReport(@RequestBody Report report) {
        List<User> team = new ArrayList<>();
        for (User user : report.getTeamMembers()){
            team.add(userDao.getUserBySap(user.getSap()));
        }
        System.out.println(team);
        report.setTeamMembers(team);
        reportDao.save(report);
    }

    // find all - return Iterable<Report>
    @GetMapping("/api/reports")
    public Iterable<Report> findAll() {
        return reportDao.findAll();
    }


    //find one - return Report
    @GetMapping("/api/report")
    public Optional<Report> findOne(@RequestParam("id") long id) {
        return reportDao.findById(id);

    }


}
