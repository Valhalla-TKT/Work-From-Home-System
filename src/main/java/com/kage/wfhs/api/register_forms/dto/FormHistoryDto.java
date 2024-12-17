package com.kage.wfhs.api.register_forms.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class FormHistoryDto {
    private Long formId;
    private String signedDate;
    private String status;
    private boolean isWFAUser;
}
