package com.burnnotice.burnnotice.Controllers;


import com.burnnotice.burnnotice.Models.Report;
import com.burnnotice.burnnotice.Models.User;
import com.burnnotice.burnnotice.Repositories.ReportHighlights;
import com.burnnotice.burnnotice.Repositories.ReportRepository;
import com.burnnotice.burnnotice.Repositories.UserRepository;
import org.springframework.web.bind.annotation.*;
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
        reportDao.save(report);
        for (User user : report.getUsers()){
            user.getReports().add(report);
        }
    }

    @GetMapping("/api/reports")
    public Iterable<ReportHighlights> reportHighlights() {
        return reportDao.findAllBy();
    }

    @GetMapping("/api/one-report")
    public Report findOneReport(@RequestParam long id){
        return reportDao.findOne(id);
    }

    // find by last name
    @GetMapping("/api/creator-report")
    public List<ReportHighlights> findAllByCreator(@RequestParam String creatorName){
        return reportDao.findAllByCreatorLastName(creatorName);
    }

    // find by date
    @GetMapping("/api/date-report")
    public List<ReportHighlights> findAllByDate(@RequestParam String createDate){
        return reportDao.findAllByCreateDateLike(createDate);
    }

    // find by date range
    @GetMapping("/api/date-range-report")
    public List<ReportHighlights> findAllByDateRange(@RequestParam String startDate,
                                                     @RequestParam String endDate){
        return reportDao.findAllByCreateDateBetween(startDate, endDate);
    }

    // find by type
    @GetMapping("/api/type-report")
    public List<ReportHighlights> findAllByDateType(@RequestParam String type){
        return reportDao.findAllByTypeName(type);
    }
}
