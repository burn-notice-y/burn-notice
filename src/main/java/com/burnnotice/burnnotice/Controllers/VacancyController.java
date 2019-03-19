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
    public Vacancy findOneVacancy(@RequestParam("id") long id)
    {
        return vacDao.findOne(id);
    }

    @PostMapping("/api/create-vacancy")
    public void createVacancy(@RequestBody Vacancy vacancy)
    {
        vacDao.save(vacancy);
    }


}
