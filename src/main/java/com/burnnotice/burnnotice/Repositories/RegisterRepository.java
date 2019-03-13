package com.burnnotice.burnnotice.Repositories;

import com.burnnotice.burnnotice.Models.User;
import org.springframework.data.repository.CrudRepository;

public interface RegisterRepository extends CrudRepository<User, Long> {

}
