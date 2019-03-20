package com.burnnotice.burnnotice.Repositories;

import com.burnnotice.burnnotice.Models.Report;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface ReportRepository extends CrudRepository<Report, Long> {
    List<ReportHighlights> findAllBy();
}
