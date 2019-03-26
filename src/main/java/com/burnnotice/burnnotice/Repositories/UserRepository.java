package com.burnnotice.burnnotice.Repositories;

import com.burnnotice.burnnotice.Models.FireStation;
import com.burnnotice.burnnotice.Models.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {
    @Query(value= "select * from users where sap = ?1", nativeQuery = true)
    User getUserBySap(String sap);

    @Query(value= "select * from users where first_name like ?1% or last_name like ?1%", nativeQuery = true)
    List<User> findUsersByName(String search);

    Iterable<OnlyNames> findAllByChiefFalse();

    LoggedInUser findUserBySap(String sap);

    User findFirstByOrderByIdDesc();


}
