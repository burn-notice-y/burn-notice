package com.burnnotice.burnnotice.Controllers;

import com.burnnotice.burnnotice.Models.Vacancy;
import com.burnnotice.burnnotice.Repositories.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class VacancyController
{
    private final VacancyRepository vacDao;
    private final FireStationRepository stationDao;
    private final TransferRequestRepository transferDao;

    public VacancyController(VacancyRepository vacDao, FireStationRepository stationDao, TransferRequestRepository transferDao) {
        this.stationDao = stationDao;
        this.transferDao = transferDao;
        this.vacDao = vacDao;
    }


    @GetMapping("/api/open-vacancies")
    public Iterable<VacancyHighlights> getOpenVacancies() {
        return vacDao.findAllByAndFillDateEqualsOrderByIdDesc("9999");
    }
    @GetMapping("/api/all-vacancies")
    public List<VacancyHighlights> getAllVacancies() {
        return vacDao.findAllBy();
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
    @DeleteMapping("/api/close-vacancy")
    public void closeVacancy(@RequestParam long id){
        Vacancy vacancy = vacDao.findOne(id);
        vacancy.setFillDate("Closed");
    }




}
