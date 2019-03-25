package com.burnnotice.burnnotice.Controllers;

import com.burnnotice.burnnotice.Models.Assignment;
import com.burnnotice.burnnotice.Repositories.AssignmentRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AssignmentsController {

    private final AssignmentRepository assignmentDao;

    public AssignmentsController(AssignmentRepository assignmentDao){
        this.assignmentDao = assignmentDao;
    }

    @GetMapping("/api/assignments")
    public Iterable<Assignment> allAssignments(@RequestParam long id){
        return assignmentDao.findAllByUserId(id);
    }
}
