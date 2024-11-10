package com.kage.wfhs.view.serviceDesk;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/serviceDesk")
@RequiredArgsConstructor
public class ServiceDeskViewController {
    @GetMapping("/mail")
    public String divisionPage() {
        return "sendMailServiceDesk";
    }
}
