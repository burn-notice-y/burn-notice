package com.burnnotice.burnnotice.Repositories;

import com.burnnotice.burnnotice.Models.Report;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface ReportRepository extends CrudRepository<Report, Long> {
    List<ReportHighlights> findAllBy();

    List<ReportHighlights> findAllByCreatorLastName(String creatorLastName);

    List<ReportHighlights> findAllByCreateDateLike(String createDate);

    List<ReportHighlights> findAllByCreateDateBetween(String startDate, String endDate);

    List<ReportHighlights> findAllByTypeName(String type);
}
