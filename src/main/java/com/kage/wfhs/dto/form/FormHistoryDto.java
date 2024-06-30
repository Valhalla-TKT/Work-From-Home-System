package com.kage.wfhs.dto.form;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class FormHistoryDto {
    private Long formId;
    private String applicantName;
    private Date signedDate;
}
