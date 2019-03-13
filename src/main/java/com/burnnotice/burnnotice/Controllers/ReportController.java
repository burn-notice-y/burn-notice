package com.burnnotice.burnnotice.Controllers;


import com.burnnotice.burnnotice.Models.Report;
import com.burnnotice.burnnotice.Repositories.ReportRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class ReportController {

    private final ReportRepository reportDao;

    public ReportController(ReportRepository reportDao) {
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
