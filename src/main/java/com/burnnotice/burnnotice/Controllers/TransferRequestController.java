package com.burnnotice.burnnotice.Controllers;

import com.burnnotice.burnnotice.Models.TransferRequest;
import com.burnnotice.burnnotice.Models.User;
import com.burnnotice.burnnotice.Repositories.TransferReqHighlights;
import com.burnnotice.burnnotice.Repositories.TransferRequestRepository;
import com.burnnotice.burnnotice.Repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class TransferRequestController {

    private final TransferRequestRepository transferDao;
    private final UserRepository userDao;

    public TransferRequestController(TransferRequestRepository transferDao, UserRepository userDao) {
        this.userDao = userDao;
        this.transferDao = transferDao;
    }

    @GetMapping("/api/findAllTransferReq")
    public Iterable<TransferRequest> findTransferByStation()
    {
        return transferDao.findAll();
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
        return transferDao.findAllByVacancy_Station_Name(stationName);
    }
}