package com.kage.wfhs.dto;

import com.kage.wfhs.model.ApproveRole;
import com.kage.wfhs.model.RegisterForm;
import com.kage.wfhs.model.Status;
import com.kage.wfhs.model.User;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class WorkFlowStatusDto {
    private long id, approverId, registerFormId;
    private boolean state;
    private Status status;
    private String reason;
    private Date approveDate;
    private User approver;
    private RegisterForm registerForm;
    private ApproveRole approveRole;
}
