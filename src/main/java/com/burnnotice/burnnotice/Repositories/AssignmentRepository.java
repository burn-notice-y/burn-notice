package com.burnnotice.burnnotice.Repositories;

import com.burnnotice.burnnotice.Models.Assignment;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AssignmentRepository extends CrudRepository<Assignment, Long> {

    List<Assignment> findAllByUserId(Long id);

    List<Assignment> findAllByUserIdOrderByIdDesc(long id);
}
