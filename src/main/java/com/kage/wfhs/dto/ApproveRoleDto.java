package com.kage.wfhs.dto;

import java.util.List;

import com.kage.wfhs.model.WorkFlowOrder;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ApproveRoleDto {
    private long id;
    private String name;
    private List<WorkFlowOrder> workFlowOrders;
}
