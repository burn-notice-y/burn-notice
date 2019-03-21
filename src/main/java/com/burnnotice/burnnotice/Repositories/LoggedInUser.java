package com.burnnotice.burnnotice.Repositories;

public interface LoggedInUser {
    String getFirstName();
    String getLastName();
    String getEmail();
    String getSap();
    boolean isChief();
    boolean isEligibleForTransfer();
}
