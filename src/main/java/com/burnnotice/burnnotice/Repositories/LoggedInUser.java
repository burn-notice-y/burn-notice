package com.burnnotice.burnnotice.Repositories;

import com.burnnotice.burnnotice.Models.FireStation;

public interface LoggedInUser {
    long getId();
    String getFirstName();
    String getLastName();
    String getEmail();
    String getSap();
    boolean isChief();
    boolean isEligibleForTransfer();
    FireStation getStations();
}
