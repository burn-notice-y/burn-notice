package com.burnnotice.burnnotice.Controllers;

import com.burnnotice.burnnotice.Models.Vacancy;
import com.burnnotice.burnnotice.Repositories.FireStationRepository;
import com.burnnotice.burnnotice.Repositories.VacancyHighlights;
import com.burnnotice.burnnotice.Repositories.VacancyRepository;
import com.burnnotice.burnnotice.Repositories.VacancyTransfer;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class VacancyController
{
    private final VacancyRepository vacDao;
    private final FireStationRepository stationDao;

    public VacancyController(VacancyRepository vacDao, FireStationRepository stationDao) {
        this.stationDao = stationDao;
        this.vacDao = vacDao;
    }


    @GetMapping("/api/all-vacancies")
    public Iterable<VacancyHighlights> viewAllVacancies()
    {
        return vacDao.findAllByOrderByIdDesc();
    }

    @GetMapping("/api/one-vacancy")
    public VacancyTransfer findOneVacancy(@RequestParam("id") long id) {
        return vacDao.findById(id);
    }

    @PostMapping("/api/create-vacancy")
    public void createVacancy(@RequestBody Vacancy vacancy) {
        vacancy.setStation(stationDao.findByName(vacancy.getStation().getName()));
        vacDao.save(vacancy);
    }


}
