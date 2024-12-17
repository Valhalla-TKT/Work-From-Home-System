package com.kage.wfhs.api.register_forms.dto;

import java.util.Date;

import com.kage.wfhs.api.users.model.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FormListDto {
    private Long id, applicantId;
    private String currentStatus, status;
    private Date signedDate;
    private User applicant, requester;
}
