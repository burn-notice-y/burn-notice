package com.burnnotice.burnnotice.Repositories;

import com.burnnotice.burnnotice.Models.TransferRequest;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TransferRequestRepository extends CrudRepository<TransferRequest, Long> {
    List<TransferReqHighlights> findAllByVacancy_Station_Name(String stationName);

}
