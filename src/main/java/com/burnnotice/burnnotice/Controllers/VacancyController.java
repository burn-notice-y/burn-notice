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


    @GetMapping("/api/all-vacancies")
    public Iterable<Vacancy> viewAllVacancies()
    {
        return vacDao.findAll();
    }

    @GetMapping("/api/one-vacancy")
    public Optional<Vacancy> findOneVacancy(@RequestParam("id") long id)
    {
        return vacDao.findById(id);
    }

    @PostMapping("/api/create-vacancy")
    public Vacancy createVacancy(@RequestBody Vacancy vacancy)
    {

        vacDao.save(vacancy);
        return vacancy;
    }


}
