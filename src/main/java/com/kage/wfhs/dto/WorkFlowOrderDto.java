package com.kage.wfhs.dto;

import com.kage.wfhs.model.ApproveRole;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class WorkFlowOrderDto {
    private long id, approveRoleId;
    private String approve_state;
    private ApproveRole approveRole;
}
