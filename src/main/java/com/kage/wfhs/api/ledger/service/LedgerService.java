/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.api.ledger.service;

import com.kage.wfhs.api.ledger.dto.LedgerDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface LedgerService {

    void createLedger(Long formId);
    List<LedgerDto> getAllLedger();

    LedgerDto getLedgerById(Long id);

}
