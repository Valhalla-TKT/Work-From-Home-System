package com.kage.wfhs.service;

import com.kage.wfhs.dto.LedgerDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface LedgerService {

    void createLedger(long formId);
    List<LedgerDto> getAllLedger();

    LedgerDto getLedgerById(long id);

}
