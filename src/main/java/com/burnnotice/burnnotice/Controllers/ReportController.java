package com.burnnotice.burnnotice.Controllers;


import com.burnnotice.burnnotice.Models.Report;
import com.burnnotice.burnnotice.Models.User;
import com.burnnotice.burnnotice.Models.UserReport;
import com.burnnotice.burnnotice.Repositories.ReportRepository;
import com.burnnotice.burnnotice.Repositories.UserReportRepository;
import com.burnnotice.burnnotice.Repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
public class ReportController {

    private final ReportRepository reportDao;
    private final UserRepository userDao;
    private final UserReportRepository userReportDao;

    public ReportController(ReportRepository reportDao, UserRepository userDao, UserReportRepository userReportDao ) {
        this.reportDao = reportDao;
        this.userDao = userDao;
        this.userReportDao = userReportDao;

    }

    @PostMapping("/api/create-report")
    public void createReport(@RequestBody Report report) {
        for (UserReport user : report.getUsers()){
            System.out.println(user.getUser().getId());
        }
        // initial save
        Report savedReport = reportDao.save(report);

        for (UserReport user: savedReport.getUsers()){
            // null
            // happening twice because of sending 2 users
            // user.getUser() is null
            userReportDao.save(new UserReport(user.getUser(), savedReport, "Primary"));
        }
    }

    // find all - return Iterable<Report>
    @GetMapping("/api/reports")
    public Iterable<Report> findAll() {
        return reportDao.findAll();
    }
}
