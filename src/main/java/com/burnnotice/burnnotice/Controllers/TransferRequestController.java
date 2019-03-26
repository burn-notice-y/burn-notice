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

    @Value("${sendgrid_api_key}") String sendGridAPIKey;
    @PostMapping("/api/approve-transfer")
    public void approveRequest( @RequestBody TransferRequest request) throws IOException {

        User applicant = userDao.findOne(request.getUser().getId());

        Vacancy vacancy = vacDao.findOne(request.getVacancy().getId());
        String stationName = stationDao.findOne(vacancy.getStation().getId()).getName();
        List<TransferRequest> applications = transferDao.findAllByVacancyId(vacancy.getId());

        Email from = new Email("info@burn-notice.com");
        String subject = "Transfer Request Approved!";
        Email to = new Email(applicant.getEmail());
        Content content = new Content("text/html", "<h1>You have been approved!<h1><br><div>" + applicant.getFirstName() + " " + applicant.getLastName() + "  has been approved for transfer to station " + stationName + "</div>");
        Mail mail = new Mail(from, subject, to, content);
        Request newRequest = new Request();
        SendGrid newSg = new SendGrid(sendGridAPIKey);
        sendEmail(newRequest, mail, newSg);


        // close vacancy -- done

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


        Email denied_from = new Email("info@burn-notice.com");
        for (TransferRequest application: applications){
            application.setStatus("Filled");
            if (application.getUser().getId() != applicant.getId()) {
                application.getUser().setEligibleForTransfer(true);
                String denied_subject = "Transfer Request Denied!";
                Email denied_to = new Email(application.getUser().getEmail());
                Content denied_content = new Content("text/html", "<h1>Your Request has been denied<h1><br><p>Dear " + application.getUser().getFirstName() + " " + application.getUser().getLastName() + ", We Regret to inform you that your transfer to station" + stationName  + "has been denied</p>");
                Mail denied_mail = new Mail(denied_from, denied_subject, denied_to, denied_content);
                Request deniedRequest = new Request();
                SendGrid sg = new SendGrid(sendGridAPIKey);
                sendEmail(deniedRequest, denied_mail, sg);
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

    public void sendEmail(Request request, Mail mail, SendGrid sg) throws IOException{
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);
            System.out.println(response.getStatusCode());
            System.out.println(response.getBody());
            System.out.println(response.getHeaders());
        } catch (IOException ex) {
            throw ex;
        }
    }
}