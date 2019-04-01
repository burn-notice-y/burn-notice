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
        Vacancy targetVac = vacDao.findOne(request.getVacancy().getId());
        FireStation targetStation = stationDao.findOne(targetVac.getStation().getId());

        Vacancy vacancy = vacDao.findOne(request.getVacancy().getId());
        String stationName = stationDao.findOne(vacancy.getStation().getId()).getName();
        List<TransferRequest> applications = transferDao.findAllByVacancyId(vacancy.getId());
        String yesOrNoEng = "";
        String yesOrNoTemp = "";


        if(targetVac.isEngine()){
            yesOrNoEng = "Engine";
        } else {
            yesOrNoEng ="Truck";
        }

        if(targetVac.isTemporary()){
            yesOrNoTemp = "yes";
        } else {
            yesOrNoTemp = "no";
        }

        Email from = new Email("info@burn-notice.com");
        String subject = "Transfer Request Approved!";
        Email to = new Email(applicant.getEmail());
        Content content = new Content("text/html", emailContent(applicant.getFirstName(), applicant.getLastName(), targetStation.getName(), yesOrNoEng, targetStation.getName(), yesOrNoTemp, targetVac.getPostDate()));
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
                Content denied_content = new Content("text/html", "<h1>Your Request has been denied</h1><br><p>Dear " + application.getUser().getFirstName() + " " + application.getUser().getLastName() + ", We Regret to inform you that your transfer to station " + stationName  + " has been denied</p>");
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
        FireStation oldStation = stationDao.findOne(applicant.getStations().get(0).getId());
        List<FireStation> newStations = new ArrayList<>();
        newStations.add(station);
        oldStation.getCurrentCrew().remove(applicant);
        applicant.setStations(newStations);

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

    public static void sendEmail(Request request, Mail mail, SendGrid sg) throws IOException{
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
    @GetMapping("/api/station-vacancies")
    public List<TransferReqHighlights> findStationVacancies(@RequestParam long id){
        return transferDao.findAllByVacancyIdOrderByIdDesc(id);
    }


    public  String emailContent(String firstName, String lastName,  String transReqNum, String type, String fireStation, String temp, String postDate){
        return "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional //EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n" +
                "\n" +
                "<html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:v=\"urn:schemas-microsoft-com:vml\">\n" +
                "<head>\n" +
                "<!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->\n" +
                "<meta content=\"text/html; charset=utf-8\" http-equiv=\"Content-Type\"/>\n" +
                "<meta content=\"width=device-width\" name=\"viewport\"/>\n" +
                "<!--[if !mso]><!-->\n" +
                "<meta content=\"IE=edge\" http-equiv=\"X-UA-Compatible\"/>\n" +
                "<!--<![endif]-->\n" +
                "<title></title>\n" +
                "<!--[if !mso]><!-->\n" +
                "<!--<![endif]-->\n" +
                "<style type=\"text/css\">\n" +
                "\t\tbody {\n" +
                "\t\t\tmargin: 0;\n" +
                "\t\t\tpadding: 0;\n" +
                "\t\t}\n" +
                "\n" +
                "\t\ttable,\n" +
                "\t\ttd,\n" +
                "\t\ttr {\n" +
                "\t\t\tvertical-align: top;\n" +
                "\t\t\tborder-collapse: collapse;\n" +
                "\t\t}\n" +
                "\n" +
                "\t\t* {\n" +
                "\t\t\tline-height: inherit;\n" +
                "\t\t}\n" +
                "\n" +
                "\t\ta[x-apple-data-detectors=true] {\n" +
                "\t\t\tcolor: inherit !important;\n" +
                "\t\t\ttext-decoration: none !important;\n" +
                "\t\t}\n" +
                "\n" +
                "\t\t.ie-browser table {\n" +
                "\t\t\ttable-layout: fixed;\n" +
                "\t\t}\n" +
                "\n" +
                "\t\t[owa] .img-container div,\n" +
                "\t\t[owa] .img-container button {\n" +
                "\t\t\tdisplay: block !important;\n" +
                "\t\t}\n" +
                "\n" +
                "\t\t[owa] .fullwidth button {\n" +
                "\t\t\twidth: 100% !important;\n" +
                "\t\t}\n" +
                "\n" +
                "\t\t[owa] .block-grid .col {\n" +
                "\t\t\tdisplay: table-cell;\n" +
                "\t\t\tfloat: none !important;\n" +
                "\t\t\tvertical-align: top;\n" +
                "\t\t}\n" +
                "\n" +
                "\t\t.ie-browser .block-grid,\n" +
                "\t\t.ie-browser .num12,\n" +
                "\t\t[owa] .num12,\n" +
                "\t\t[owa] .block-grid {\n" +
                "\t\t\twidth: 600px !important;\n" +
                "\t\t}\n" +
                "\n" +
                "\t\t.ie-browser .mixed-two-up .num4,\n" +
                "\t\t[owa] .mixed-two-up .num4 {\n" +
                "\t\t\twidth: 200px !important;\n" +
                "\t\t}\n" +
                "\n" +
                "\t\t.ie-browser .mixed-two-up .num8,\n" +
                "\t\t[owa] .mixed-two-up .num8 {\n" +
                "\t\t\twidth: 400px !important;\n" +
                "\t\t}\n" +
                "\n" +
                "\t\t.ie-browser .block-grid.two-up .col,\n" +
                "\t\t[owa] .block-grid.two-up .col {\n" +
                "\t\t\twidth: 300px !important;\n" +
                "\t\t}\n" +
                "\n" +
                "\t\t.ie-browser .block-grid.three-up .col,\n" +
                "\t\t[owa] .block-grid.three-up .col {\n" +
                "\t\t\twidth: 300px !important;\n" +
                "\t\t}\n" +
                "\n" +
                "\t\t.ie-browser .block-grid.four-up .col [owa] .block-grid.four-up .col {\n" +
                "\t\t\twidth: 150px !important;\n" +
                "\t\t}\n" +
                "\n" +
                "\t\t.ie-browser .block-grid.five-up .col [owa] .block-grid.five-up .col {\n" +
                "\t\t\twidth: 120px !important;\n" +
                "\t\t}\n" +
                "\n" +
                "\t\t.ie-browser .block-grid.six-up .col,\n" +
                "\t\t[owa] .block-grid.six-up .col {\n" +
                "\t\t\twidth: 100px !important;\n" +
                "\t\t}\n" +
                "\n" +
                "\t\t.ie-browser .block-grid.seven-up .col,\n" +
                "\t\t[owa] .block-grid.seven-up .col {\n" +
                "\t\t\twidth: 85px !important;\n" +
                "\t\t}\n" +
                "\n" +
                "\t\t.ie-browser .block-grid.eight-up .col,\n" +
                "\t\t[owa] .block-grid.eight-up .col {\n" +
                "\t\t\twidth: 75px !important;\n" +
                "\t\t}\n" +
                "\n" +
                "\t\t.ie-browser .block-grid.nine-up .col,\n" +
                "\t\t[owa] .block-grid.nine-up .col {\n" +
                "\t\t\twidth: 66px !important;\n" +
                "\t\t}\n" +
                "\n" +
                "\t\t.ie-browser .block-grid.ten-up .col,\n" +
                "\t\t[owa] .block-grid.ten-up .col {\n" +
                "\t\t\twidth: 60px !important;\n" +
                "\t\t}\n" +
                "\n" +
                "\t\t.ie-browser .block-grid.eleven-up .col,\n" +
                "\t\t[owa] .block-grid.eleven-up .col {\n" +
                "\t\t\twidth: 54px !important;\n" +
                "\t\t}\n" +
                "\n" +
                "\t\t.ie-browser .block-grid.twelve-up .col,\n" +
                "\t\t[owa] .block-grid.twelve-up .col {\n" +
                "\t\t\twidth: 50px !important;\n" +
                "\t\t}\n" +
                "\t</style>\n" +
                "<style id=\"media-query\" type=\"text/css\">\n" +
                "\t\t@media only screen and (min-width: 620px) {\n" +
                "\t\t\t.block-grid {\n" +
                "\t\t\t\twidth: 600px !important;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.block-grid .col {\n" +
                "\t\t\t\tvertical-align: top;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.block-grid .col.num12 {\n" +
                "\t\t\t\twidth: 600px !important;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.block-grid.mixed-two-up .col.num3 {\n" +
                "\t\t\t\twidth: 150px !important;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.block-grid.mixed-two-up .col.num4 {\n" +
                "\t\t\t\twidth: 200px !important;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.block-grid.mixed-two-up .col.num8 {\n" +
                "\t\t\t\twidth: 400px !important;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.block-grid.mixed-two-up .col.num9 {\n" +
                "\t\t\t\twidth: 450px !important;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.block-grid.two-up .col {\n" +
                "\t\t\t\twidth: 300px !important;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.block-grid.three-up .col {\n" +
                "\t\t\t\twidth: 200px !important;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.block-grid.four-up .col {\n" +
                "\t\t\t\twidth: 150px !important;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.block-grid.five-up .col {\n" +
                "\t\t\t\twidth: 120px !important;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.block-grid.six-up .col {\n" +
                "\t\t\t\twidth: 100px !important;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.block-grid.seven-up .col {\n" +
                "\t\t\t\twidth: 85px !important;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.block-grid.eight-up .col {\n" +
                "\t\t\t\twidth: 75px !important;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.block-grid.nine-up .col {\n" +
                "\t\t\t\twidth: 66px !important;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.block-grid.ten-up .col {\n" +
                "\t\t\t\twidth: 60px !important;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.block-grid.eleven-up .col {\n" +
                "\t\t\t\twidth: 54px !important;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.block-grid.twelve-up .col {\n" +
                "\t\t\t\twidth: 50px !important;\n" +
                "\t\t\t}\n" +
                "\t\t}\n" +
                "\n" +
                "\t\t@media (max-width: 620px) {\n" +
                "\n" +
                "\t\t\t.block-grid,\n" +
                "\t\t\t.col {\n" +
                "\t\t\t\tmin-width: 320px !important;\n" +
                "\t\t\t\tmax-width: 100% !important;\n" +
                "\t\t\t\tdisplay: block !important;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.block-grid {\n" +
                "\t\t\t\twidth: 100% !important;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.col {\n" +
                "\t\t\t\twidth: 100% !important;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.col>div {\n" +
                "\t\t\t\tmargin: 0 auto;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\timg.fullwidth,\n" +
                "\t\t\timg.fullwidthOnMobile {\n" +
                "\t\t\t\tmax-width: 100% !important;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.no-stack .col {\n" +
                "\t\t\t\tmin-width: 0 !important;\n" +
                "\t\t\t\tdisplay: table-cell !important;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.no-stack.two-up .col {\n" +
                "\t\t\t\twidth: 50% !important;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.no-stack .col.num4 {\n" +
                "\t\t\t\twidth: 33% !important;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.no-stack .col.num8 {\n" +
                "\t\t\t\twidth: 66% !important;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.no-stack .col.num4 {\n" +
                "\t\t\t\twidth: 33% !important;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.no-stack .col.num3 {\n" +
                "\t\t\t\twidth: 25% !important;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.no-stack .col.num6 {\n" +
                "\t\t\t\twidth: 50% !important;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.no-stack .col.num9 {\n" +
                "\t\t\t\twidth: 75% !important;\n" +
                "\t\t\t}\n" +
                "\n" +
                "\t\t\t.mobile_hide {\n" +
                "\t\t\t\tmin-height: 0px;\n" +
                "\t\t\t\tmax-height: 0px;\n" +
                "\t\t\t\tmax-width: 0px;\n" +
                "\t\t\t\tdisplay: none;\n" +
                "\t\t\t\toverflow: hidden;\n" +
                "\t\t\t\tfont-size: 0px;\n" +
                "\t\t\t}\n" +
                "\t\t}\n" +
                "\t</style>\n" +
                "</head>\n" +
                "<body class=\"clean-body\" style=\"margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #53B2D7;\">\n" +
                "<style id=\"media-query-bodytag\" type=\"text/css\">\n" +
                "@media (max-width: 620px) {\n" +
                "  .block-grid {\n" +
                "    min-width: 320px!important;\n" +
                "    max-width: 100%!important;\n" +
                "    width: 100%!important;\n" +
                "    display: block!important;\n" +
                "  }\n" +
                "  .col {\n" +
                "    min-width: 320px!important;\n" +
                "    max-width: 100%!important;\n" +
                "    width: 100%!important;\n" +
                "    display: block!important;\n" +
                "  }\n" +
                "  .col > div {\n" +
                "    margin: 0 auto;\n" +
                "  }\n" +
                "  img.fullwidth {\n" +
                "    max-width: 100%!important;\n" +
                "    height: auto!important;\n" +
                "  }\n" +
                "  img.fullwidthOnMobile {\n" +
                "    max-width: 100%!important;\n" +
                "    height: auto!important;\n" +
                "  }\n" +
                "  .no-stack .col {\n" +
                "    min-width: 0!important;\n" +
                "    display: table-cell!important;\n" +
                "  }\n" +
                "  .no-stack.two-up .col {\n" +
                "    width: 50%!important;\n" +
                "  }\n" +
                "  .no-stack.mixed-two-up .col.num4 {\n" +
                "    width: 33%!important;\n" +
                "  }\n" +
                "  .no-stack.mixed-two-up .col.num8 {\n" +
                "    width: 66%!important;\n" +
                "  }\n" +
                "  .no-stack.three-up .col.num4 {\n" +
                "    width: 33%!important\n" +
                "  }\n" +
                "  .no-stack.four-up .col.num3 {\n" +
                "    width: 25%!important\n" +
                "  }\n" +
                "}\n" +
                "</style>\n" +
                "<!--[if IE]><div class=\"ie-browser\"><![endif]-->\n" +
                "<table bgcolor=\"#53B2D7\" cellpadding=\"0\" cellspacing=\"0\" class=\"nl-container\" style=\"table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #53B2D7; width: 100%;\" valign=\"top\" width=\"100%\">\n" +
                "<tbody>\n" +
                "<tr style=\"vertical-align: top;\" valign=\"top\">\n" +
                "<td style=\"word-break: break-word; vertical-align: top; border-collapse: collapse;\" valign=\"top\">\n" +
                "<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td align=\"center\" style=\"background-color:#53B2D7\"><![endif]-->\n" +
                "<div style=\"background-color:#283C4B;\">\n" +
                "<div class=\"block-grid\" style=\"Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #283C4B;;\">\n" +
                "<div style=\"border-collapse: collapse;display: table;width: 100%;background-color:#283C4B;\">\n" +
                "<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:#283C4B;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:600px\"><tr class=\"layout-full-width\" style=\"background-color:#283C4B\"><![endif]-->\n" +
                "<!--[if (mso)|(IE)]><td align=\"center\" width=\"600\" style=\"background-color:#283C4B;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;\"><![endif]-->\n" +
                "<div class=\"col num12\" style=\"min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top;;\">\n" +
                "<div style=\"width:100% !important;\">\n" +
                "<!--[if (!mso)&(!IE)]><!-->\n" +
                "<div style=\"border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;\">\n" +
                "<!--<![endif]-->\n" +
                "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"divider\" style=\"table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;\" valign=\"top\" width=\"100%\">\n" +
                "<tbody>\n" +
                "<tr style=\"vertical-align: top;\" valign=\"top\">\n" +
                "<td class=\"divider_inner\" style=\"word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px; border-collapse: collapse;\" valign=\"top\">\n" +
                "<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"divider_content\" height=\"0\" style=\"table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border-top: 1px solid #283C4B; height: 0px;\" valign=\"top\" width=\"100%\">\n" +
                "<tbody>\n" +
                "<tr style=\"vertical-align: top;\" valign=\"top\">\n" +
                "<td height=\"0\" style=\"word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: collapse;\" valign=\"top\"><span></span></td>\n" +
                "</tr>\n" +
                "</tbody>\n" +
                "</table>\n" +
                "</td>\n" +
                "</tr>\n" +
                "</tbody>\n" +
                "</table>\n" +
                "<!--[if (!mso)&(!IE)]><!-->\n" +
                "</div>\n" +
                "<!--<![endif]-->\n" +
                "</div>\n" +
                "</div>\n" +
                "<!--[if (mso)|(IE)]></td></tr></table><![endif]-->\n" +
                "<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->\n" +
                "</div>\n" +
                "</div>\n" +
                "</div>\n" +
                "<div style=\"background-color:#283C4B;\">\n" +
                "<div class=\"block-grid\" style=\"Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #BB0303;;\">\n" +
                "<div style=\"border-collapse: collapse;display: table;width: 100%;background-color:#BB0303;\">\n" +
                "<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:#283C4B;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:600px\"><tr class=\"layout-full-width\" style=\"background-color:#BB0303\"><![endif]-->\n" +
                "<!--[if (mso)|(IE)]><td align=\"center\" width=\"600\" style=\"background-color:#BB0303;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;\"><![endif]-->\n" +
                "<div class=\"col num12\" style=\"min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top;;\">\n" +
                "<div style=\"width:100% !important;\">\n" +
                "<!--[if (!mso)&(!IE)]><!-->\n" +
                "<div style=\"border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;\">\n" +
                "<!--<![endif]-->\n" +
                "<!--[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 20px; padding-left: 20px; padding-top: 30px; padding-bottom: 20px; font-family: Arial, sans-serif\"><![endif]-->\n" +
                "<div style=\"color:#FFFFFF;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:120%;padding-top:30px;padding-right:20px;padding-bottom:20px;padding-left:20px;\">\n" +
                "<div style=\"font-size: 12px; line-height: 14px; color: #FFFFFF; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;\">\n" +
                "<p style=\"font-size: 18px; line-height: 28px; text-align: center; margin: 0;\"><span style=\"font-size: 24px;\">Transfer Request Approved</span></p>\n" +
                "</div>\n" +
                "</div>\n" +
                "<!--[if mso]></td></tr></table><![endif]-->\n" +
                "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"divider\" style=\"table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;\" valign=\"top\" width=\"100%\">\n" +
                "<tbody>\n" +
                "<tr style=\"vertical-align: top;\" valign=\"top\">\n" +
                "<td class=\"divider_inner\" style=\"word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px; border-collapse: collapse;\" valign=\"top\">\n" +
                "<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"divider_content\" height=\"0\" style=\"table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border-top: 1px solid #BB0303; height: 0px;\" valign=\"top\" width=\"100%\">\n" +
                "<tbody>\n" +
                "<tr style=\"vertical-align: top;\" valign=\"top\">\n" +
                "<td height=\"0\" style=\"word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: collapse;\" valign=\"top\"><span></span></td>\n" +
                "</tr>\n" +
                "</tbody>\n" +
                "</table>\n" +
                "</td>\n" +
                "</tr>\n" +
                "</tbody>\n" +
                "</table>\n" +
                "<!--[if (!mso)&(!IE)]><!-->\n" +
                "</div>\n" +
                "<!--<![endif]-->\n" +
                "</div>\n" +
                "</div>\n" +
                "<!--[if (mso)|(IE)]></td></tr></table><![endif]-->\n" +
                "<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->\n" +
                "</div>\n" +
                "</div>\n" +
                "</div>\n" +
                "<div style=\"background-color:#283C4B;\">\n" +
                "<div class=\"block-grid\" style=\"Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #FFFFFF;;\">\n" +
                "<div style=\"border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;\">\n" +
                "<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:#283C4B;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:600px\"><tr class=\"layout-full-width\" style=\"background-color:#FFFFFF\"><![endif]-->\n" +
                "<!--[if (mso)|(IE)]><td align=\"center\" width=\"600\" style=\"background-color:#FFFFFF;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:10px;\"><![endif]-->\n" +
                "<div class=\"col num12\" style=\"min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top;;\">\n" +
                "<div style=\"width:100% !important;\">\n" +
                "<!--[if (!mso)&(!IE)]><!-->\n" +
                "<div style=\"border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:10px; padding-right: 0px; padding-left: 0px;\">\n" +
                "<!--<![endif]-->\n" +
                "<!--[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 30px; padding-left: 30px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif\"><![endif]-->\n" +
                "<div style=\"color:#283C4B;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:150%;padding-top:10px;padding-right:30px;padding-bottom:10px;padding-left:30px;\">\n" +
                "<div style=\"font-size: 12px; line-height: 18px; color: #283C4B; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;\">\n" +
                "<p style=\"font-size: 12px; line-height: 24px; margin: 0;\"><span style=\"font-size: 16px;\"><strong><span style=\"line-height: 24px; font-size: 16px;\">Dear "+ firstName + " " + lastName + ",</span></strong></span></p>\n" +
                "<p style=\"font-size: 12px; line-height: 24px; margin: 0;\"><span style=\"font-size: 16px;\"><strong><span style=\"line-height: 24px; font-size: 16px;\">This is to inform you that you were just approved for a transfer. </span></strong></span></p>\n" +
                "<p style=\"font-size: 12px; line-height: 18px; margin: 0;\"> </p>\n" +
                "<p style=\"font-size: 12px; line-height: 24px; margin: 0;\"><span style=\"font-size: 16px;\"><strong><span style=\"line-height: 24px; font-size: 16px;\">Here are the details:</span></strong></span></p>\n" +
                "</div>\n" +
                "</div>\n" +
                "<!--[if mso]></td></tr></table><![endif]-->\n" +
                "<!--[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 30px; padding-left: 30px; padding-top: 10px; padding-bottom: 30px; font-family: Arial, sans-serif\"><![endif]-->\n" +
                "<div style=\"color:#283C4B;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:150%;padding-top:10px;padding-right:30px;padding-bottom:30px;padding-left:30px;\">\n" +
                "<div style=\"line-height: 18px; font-size: 12px; color: #283C4B; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;\">\n" +
                "<p style=\"font-size: 12px; line-height: 18px; margin: 0;\"> </p>\n" +
                "<p style=\"font-size: 12px; line-height: 21px; margin: 0;\"><span style=\"font-size: 14px;\">Transfer Request #: " + transReqNum +"</span></p>\n" +
                "<p style=\"font-size: 12px; line-height: 21px; text-align: left; margin: 0;\"><span style=\"font-size: 14px;\"> </span></p>\n" +
                "<p style=\"font-size: 12px; line-height: 21px; text-align: left; margin: 0;\"><span style=\"font-size: 14px;\">Type: " + type +"</span></p>\n" +
                "<p style=\"font-size: 12px; line-height: 21px; text-align: left; margin: 0;\"><span style=\"font-size: 14px;\">Station: "+ fireStation +"</span></p>\n" +
                "<p style=\"font-size: 12px; line-height: 21px; text-align: left; margin: 0;\"><span style=\"font-size: 14px;\">Temporary: " + temp +"</span></p>\n" +
                "<p style=\"line-height: 21px; text-align: left; font-size: 12px; margin: 0;\"><span style=\"font-size: 14px;\">Posted: "+ postDate +"</span></p>\n" +
                "<p style=\"font-size: 12px; line-height: 21px; text-align: left; margin: 0;\"><span style=\"font-size: 14px;\"> </span></p>\n" +
                "<p style=\"font-size: 12px; line-height: 21px; text-align: left; margin: 0;\"><span style=\"font-size: 14px;\">Thanks &amp; Best Regards,</span></p>\n" +
                "<p style=\"font-size: 12px; line-height: 21px; text-align: left; margin: 0;\"><span style=\"font-size: 14px;\">Burn Notice</span></p>\n" +
                "</div>\n" +
                "</div>\n" +
                "<!--[if mso]></td></tr></table><![endif]-->\n" +
                "<!--[if (!mso)&(!IE)]><!-->\n" +
                "</div>\n" +
                "<!--<![endif]-->\n" +
                "</div>\n" +
                "</div>\n" +
                "<!--[if (mso)|(IE)]></td></tr></table><![endif]-->\n" +
                "<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->\n" +
                "</div>\n" +
                "</div>\n" +
                "</div>\n" +
                "<div style=\"background-color:#283C4B;\">\n" +
                "<div class=\"block-grid\" style=\"Margin: 0 auto; min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;;\">\n" +
                "<div style=\"border-collapse: collapse;display: table;width: 100%;background-color:transparent;\">\n" +
                "<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:#283C4B;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:600px\"><tr class=\"layout-full-width\" style=\"background-color:transparent\"><![endif]-->\n" +
                "<!--[if (mso)|(IE)]><td align=\"center\" width=\"600\" style=\"background-color:transparent;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 0px; padding-left: 0px; padding-top:30px; padding-bottom:10px;\"><![endif]-->\n" +
                "<div class=\"col num12\" style=\"min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top;;\">\n" +
                "<div style=\"width:100% !important;\">\n" +
                "<!--[if (!mso)&(!IE)]><!-->\n" +
                "<div style=\"border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:30px; padding-bottom:10px; padding-right: 0px; padding-left: 0px;\">\n" +
                "<!--<![endif]-->\n" +
                "<table cellpadding=\"0\" cellspacing=\"0\" class=\"social_icons\" style=\"table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;\" valign=\"top\" width=\"100%\">\n" +
                "<tbody>\n" +
                "<tr style=\"vertical-align: top;\" valign=\"top\">\n" +
                "<td style=\"word-break: break-word; vertical-align: top; padding-top: 20px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px; border-collapse: collapse;\" valign=\"top\">\n" +
                "<table activate=\"activate\" align=\"center\" alignment=\"alignment\" cellpadding=\"0\" cellspacing=\"0\" class=\"social_table\" style=\"table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: undefined; mso-table-tspace: 0; mso-table-rspace: 0; mso-table-bspace: 0; mso-table-lspace: 0;\" to=\"to\" valign=\"top\">\n" +
                "<tbody>\n" +
                "<tr align=\"center\" style=\"vertical-align: top; display: inline-block; text-align: center;\" valign=\"top\"></tr>\n" +
                "</tbody>\n" +
                "</table>\n" +
                "</td>\n" +
                "</tr>\n" +
                "</tbody>\n" +
                "</table>\n" +
                "<!--[if (!mso)&(!IE)]><!-->\n" +
                "</div>\n" +
                "<!--<![endif]-->\n" +
                "</div>\n" +
                "</div>\n" +
                "<!--[if (mso)|(IE)]></td></tr></table><![endif]-->\n" +
                "<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->\n" +
                "</div>\n" +
                "</div>\n" +
                "</div>\n" +
                "<!--[if (mso)|(IE)]></td></tr></table><![endif]-->\n" +
                "</td>\n" +
                "</tr>\n" +
                "</tbody>\n" +
                "</table>\n" +
                "<!--[if (IE)]></div><![endif]-->\n" +
                "</body>\n" +
                "</html>";
    }


}


