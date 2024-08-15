/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.dto;

import com.kage.wfhs.model.ApproveRole;
import com.kage.wfhs.model.RegisterForm;
import com.kage.wfhs.model.Status;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class WorkFlowStatusDto {
    private Long id, approverId, registerFormId, newApproverId;
    private boolean state;
    private Status status;
    private String reason;
    private Date approveDate;
    private String approverName;
//    private User approver;
    private RegisterForm registerForm;
    private ApproveRole approveRole;
}
