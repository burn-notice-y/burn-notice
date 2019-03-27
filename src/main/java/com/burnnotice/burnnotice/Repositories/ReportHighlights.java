package com.burnnotice.burnnotice.Repositories;

import com.burnnotice.burnnotice.Models.ReportType;

public interface ReportHighlights {
    long getId();
    String getCreateDate();
    ReportType getType();
    OnlyNames getCreator();
}
