package com.burnnotice.burnnotice.Repositories;

import com.burnnotice.burnnotice.Models.FireStation;
import com.burnnotice.burnnotice.Models.Vacancy;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface VacancyRepository extends CrudRepository<Vacancy, Long> {
    List<VacancyHighlights> findAllByAndFillDateEqualsOrderByIdDesc(String fillDate);

    VacancyTransfer findById(Long id);

    List<VacancyHighlights> findAllBy();

}
