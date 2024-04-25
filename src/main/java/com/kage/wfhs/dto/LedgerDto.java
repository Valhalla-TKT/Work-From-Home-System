package com.kage.wfhs.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LedgerDto {
    private long id;
    private String department, team, staff_id, name, email, workcation, reason_for_wfh, project_manager_approve, department_head_approve, division_head_approve, ciso_approve, ceo_approve, use_own_facilities, computer, monitor, ups, phone, other,environment_facilities;
    private Date applied_date, from_date, to_date, signed_pledge_letter_date;
    private double request_percent;
    private Date project_manager_approveDate, department_head_approveDate, division_head_approveDate, ciso_approveDate, final_approveDate;

}
