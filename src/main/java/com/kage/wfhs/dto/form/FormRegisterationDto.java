package com.kage.wfhs.dto.form;

import com.kage.wfhs.model.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Getter
@Setter
public class FormRegisterationDto {
    private Long applicantId;
    private Long requesterId;
    private String positionName;
    private String workingPlace;
    private String requestReason;
    private double requestPercent;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date fromDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date toDate;
    private String osType;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date appliedDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date signedDate;
    private Long approverId;
}
