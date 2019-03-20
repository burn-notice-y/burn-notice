package com.burnnotice.burnnotice.Repositories;

import com.burnnotice.burnnotice.Models.ReportType;

public interface ReportHighlights {
    String getCreateDate();
    ReportType getType();
    OnlyNames getCreator();
}
