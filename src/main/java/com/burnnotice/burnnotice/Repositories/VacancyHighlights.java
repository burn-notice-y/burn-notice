package com.burnnotice.burnnotice.Repositories;

public interface VacancyHighlights {
    long getId();
    StationName getStation();
    boolean getEngine();
    boolean getTemporary();
    String getFillDate();
}
