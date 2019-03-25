package com.burnnotice.burnnotice.Controllers;

import com.burnnotice.burnnotice.Models.*;
import com.burnnotice.burnnotice.Repositories.*;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


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
        return transferDao.findAllByVacancy_Station_NameAndStatusContains(stationName, "Pending");
    }

    @GetMapping("/api/one-transfer")
    public TransferRequest findOne(@RequestParam long id){
        return transferDao.findOne(id);
    }

    @PostMapping("/api/approve-transfer")
    public void approveRequest( @RequestBody TransferRequest request) {
        // notify user
        User applicant = userDao.findOne(request.getUser().getId());

        // close vacancy
        Vacancy vacancy = vacDao.findOne(request.getVacancy().getId());
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        vacancy.setFillDate(dateFormat.format(new Date()));
        vacDao.save(vacancy);

        // populate assignment history with start date of assignment the same as vacancy start
        FireStation station = stationDao.findOne(vacancy.getStation().getId());
        Assignment newAssignment =
                new Assignment(vacancy.getPostDate(), "9999", vacancy.isEngine(), station, applicant);
        assignmentDao.save(newAssignment);

        // end most current assignment with the start date of the vacancy

        // set status to approved
        TransferRequest transferRequest = transferDao.findOne(request.getId());
        transferRequest.setStatus("Approved");
        transferDao.save(transferRequest);

        // set all other applications for the vacancy to "Filled"
        List<TransferRequest> applications = transferDao.findAllByVacancyId(vacancy.getId());
        for (TransferRequest application: applications){
            application.setStatus("Filled");
        }
        transferDao.save(applications);
    }

    @PostMapping("/api/deny-transfer")
    public void denyRequest(@RequestBody TransferRequest request) {
        // set eligibility to true
        User applicant = userDao.findOne(request.getUser().getId());
        applicant.setEligibleForTransfer(true);
        userDao.save(applicant);

        // notify user somehow


        // set status to denied
        TransferRequest transferRequest = transferDao.findOne(request.getId());
        transferRequest.setStatus("Denied");
        transferDao.save(transferRequest);
    }
}