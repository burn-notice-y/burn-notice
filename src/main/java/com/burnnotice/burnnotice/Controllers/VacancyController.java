package com.burnnotice.burnnotice.Controllers;

import com.burnnotice.burnnotice.Models.Vacancy;
import com.burnnotice.burnnotice.Repositories.VacancyRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class VacancyController
{
    private final VacancyRepository vacDao;

    public VacancyController(VacancyRepository vacDao)
    {
        this.vacDao = vacDao;
    }


    @GetMapping("/api/vacancies")
    public Iterable<Vacancy> viewAllVacancies()
    {
        return vacDao.findAll();
    }

    @GetMapping("/api/vacancies")
    public Optional<Vacancy> findOneVacancy(@RequestParam("id") long id)
    {
        return vacDao.findById(id);
    }

    @PostMapping("/api/vacancies/create-vacancy")
    public Vacancy createVacancy()
    {
        Vacancy vacancy = new Vacancy();
        vacDao.save(vacancy);
        return vacancy;
    }


}
