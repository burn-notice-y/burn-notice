package com.burnnotice.burnnotice.Repositories;

public interface TransferReqHighlights {
    // use getters for the transfer req class

    // one getter per property on the TransferRequest object
    long getId();
    String getSentDate();
    OnlyNames getUser();
    VacancyFromTransfer getVacancy();
}
