package com.burnnotice.burnnotice.Repositories;

import com.burnnotice.burnnotice.Models.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
    @Query(value= "select * from users where sap = ?1", nativeQuery = true)
    User getUserBySap(String sap);



}
