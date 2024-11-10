/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.api.ledger.controller;

import com.kage.wfhs.api.ledger.dto.LedgerDto;
import com.kage.wfhs.api.ledger.service.LedgerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/ledger/")
public class LedgerController {

    private final LedgerService ledgerService;

    @GetMapping("/getAllLedgerInfo")
    public String getAllLedger(Model model) {
	    List<LedgerDto> ledgerList = ledgerService.getAllLedger();
	    model.addAttribute("ledgerList", ledgerList);
	    return "ledger-view";
    }
}
