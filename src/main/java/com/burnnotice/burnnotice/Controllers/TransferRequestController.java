package com.burnnotice.burnnotice.Controllers;

import com.burnnotice.burnnotice.Models.TransferRequest;
import com.burnnotice.burnnotice.Repositories.TransferRequestRepository;
import org.springframework.web.bind.annotation.*;


@RestController
public class TransferRequestController {

    private final TransferRequestRepository transferDao;

    public TransferRequestController(TransferRequestRepository transferDao) {
        this.transferDao = transferDao;
    }

    @PostMapping("/api/submitApplication")
    public void submitApplication(@RequestBody TransferRequest transferRequest) {
       transferDao.save(transferRequest);
    }
}