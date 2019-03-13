package com.burnnotice.burnnotice.Controllers;


import com.burnnotice.burnnotice.Repository.ReportRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@Controller
public class Report {

    private final ReportRepository reportDao;

    public Report(ReportRepository reportDao) {
        this.reportDao = reportDao;
    }

    @PostMapping("/api/create-report")
    public void createReport(@RequestBody Report report) {
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
