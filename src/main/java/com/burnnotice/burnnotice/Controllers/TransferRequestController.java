package com.burnnotice.burnnotice.Controllers;

import com.burnnotice.burnnotice.Models.TransferRequest;
import com.burnnotice.burnnotice.Repositories.TransferReqHighlights;
import com.burnnotice.burnnotice.Repositories.TransferRequestRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class TransferRequestController {

    private final TransferRequestRepository transferDao;

    public TransferRequestController(TransferRequestRepository transferDao) {
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
    }

    @GetMapping("/api/findTransferByStation")
    public List<TransferReqHighlights> findAllByStation(@RequestParam String stationName) {
        return transferDao.findAllByVacancy_Station_Name(stationName);
    }
}