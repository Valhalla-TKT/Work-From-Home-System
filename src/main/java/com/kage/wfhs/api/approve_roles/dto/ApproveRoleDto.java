/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.api.approve_roles.dto;

import java.util.List;

import com.kage.wfhs.api.work_flow_orders.model.WorkFlowOrder;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ApproveRoleDto {
    private Long id;
    private String name;
    private List<WorkFlowOrder> workFlowOrders;
}
