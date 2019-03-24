package com.burnnotice.burnnotice.Repositories;

import java.util.List;

public interface VacancyTransfer {
    long getId();
    StationNameAndCrew getStation();
    String getPostDate();
    String getFillDate();
    boolean isTemporary();
    boolean isEngine();

}
