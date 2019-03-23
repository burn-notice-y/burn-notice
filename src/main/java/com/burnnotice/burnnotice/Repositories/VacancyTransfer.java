package com.burnnotice.burnnotice.Repositories;

import java.util.List;

public interface VacancyTransfer {
    long getId();
    StationNameAndCrew getStation();
    boolean getEngine();
    boolean getTemporary();

}
