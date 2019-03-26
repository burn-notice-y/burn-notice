package com.burnnotice.burnnotice.Controllers;

import com.burnnotice.burnnotice.Models.*;
import com.burnnotice.burnnotice.Repositories.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import com.sendgrid.*;


@RestController
public class TransferRequestController {

    private final TransferRequestRepository transferDao;
    private final UserRepository userDao;
    private final VacancyRepository vacDao;
    private final FireStationRepository stationDao;
    private final AssignmentRepository assignmentDao;

    public TransferRequestController(TransferRequestRepository transferDao, UserRepository userDao, VacancyRepository vacDao, FireStationRepository stationDao, AssignmentRepository assignmentDao) {
        this.userDao = userDao;
        this.stationDao = stationDao;
        this.vacDao = vacDao;
        this.transferDao = transferDao;
        this.assignmentDao = assignmentDao;
    }

    @GetMapping("/api/user-transfer-req")
    public List<TransferReqHighlights> findTransferByStation(@RequestParam long id) {
        return transferDao.findAllByUserId(id);
    }

    @PostMapping("/api/submitApplication")
    public void submitApplication(@RequestBody TransferRequest transferRequest) {
        transferDao.save(transferRequest);

        // sets transfer eligibility to false while review is pending
        User applicant = userDao.findOne(transferRequest.getUser().getId());
        applicant.setEligibleForTransfer(false);
        userDao.save(applicant);
    }

    @GetMapping("/api/findTransferByStation")
    public List<TransferReqHighlights> findAllByStation(@RequestParam String stationName) {
        System.out.println(stationName);
        return transferDao.findAllByVacancy_Station_NameAndStatusIsStartingWith(stationName, "P");
    }

    @GetMapping("/api/one-transfer")
    public TransferRequest findOne(@RequestParam long id){
        return transferDao.findOne(id);
    }

    @Value("{$sendgrid_api_key}") String sendGridAPIKey;
    @PostMapping("/api/approve-transfer")
    public void approveRequest( @RequestBody TransferRequest request){

        User applicant = userDao.findOne(request.getUser().getId());

        Vacancy vacancy = vacDao.findOne(request.getVacancy().getId());
        List<TransferRequest> applications = transferDao.findAllByVacancyId(vacancy.getId());

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        vacancy.setFillDate(dateFormat.format(new Date()));
        vacDao.save(vacancy);

        // working
        Assignment targetAssignment = assignmentDao.findAllByUserIdOrderByIdDesc(applicant.getId()).get(0);
        targetAssignment.setEndDate(vacancy.getPostDate());
        assignmentDao.save(targetAssignment);

        // -- working
        FireStation station = stationDao.findOne(vacancy.getStation().getId());
        Assignment newAssignment =
                new Assignment(vacancy.getPostDate(), "9999", vacancy.isEngine(), station, applicant);
        assignmentDao.save(newAssignment);


        // set all other applications for the vacancy to "Filled" -- needs testing

        for (TransferRequest application: applications){
            application.setStatus("Filled");
            if (application.getUser().getId() != applicant.getId()) {
                // send email
                application.getUser().setEligibleForTransfer(true);
            }
        }
        transferDao.save(applications);

        // working
        TransferRequest transferRequest = transferDao.findOne(request.getId());
        transferRequest.setStatus("Approved");
        transferDao.save(transferRequest);



        // Add an association between the successful applicant and the accepting fire station
        station.getCurrentCrew().add(applicant);
        stationDao.save(station);
    }

    @PostMapping("/api/deny-transfer")
    public void denyRequest(@RequestBody TransferRequest request) {
        // set eligibility to true
        User applicant = userDao.findOne(request.getUser().getId());
        applicant.setEligibleForTransfer(true);
        userDao.save(applicant);

        // set status to denied
        TransferRequest transferRequest = transferDao.findOne(request.getId());
        transferRequest.setStatus("Denied");
        transferDao.save(transferRequest);
    }

    @PostMapping("/api/test")
    public Assignment test(){
        return assignmentDao.findAllByUserIdOrderByIdDesc(33).get(0);
    }
}