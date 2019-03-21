package com.burnnotice.burnnotice.Repositories;

import com.burnnotice.burnnotice.Models.FireStation;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FireStationRepository extends CrudRepository<FireStation, Long> {
    List<StationHighlights> findAllBy();
    FireStation findByName(String name);
}
