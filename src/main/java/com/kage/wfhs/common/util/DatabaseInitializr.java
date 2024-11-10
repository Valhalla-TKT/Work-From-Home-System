package com.kage.wfhs.common.util;

import com.kage.wfhs.api.approve_roles.service.ApproveRoleService;
import com.kage.wfhs.api.users.service.UserService;
import com.kage.wfhs.api.work_flow_orders.service.WorkFlowOrderService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Arrays;

/**
 * Component for initializing data during application startup.
 */
@Component
@RequiredArgsConstructor
public class DatabaseInitializr {

    private final ApproveRoleService approveRoleService;

    private final UserService userService;

    private final WorkFlowOrderService workFlowOrderService;

    /**
     * Initializes roles in the system.
     *
     * This method is called after the bean has been constructed and is used to ensure
     * that the necessary approve roles ("APPLICANT", "HR", "PROJECT_MANAGER", "DEPARTMENT_HEAD", "DIVISION_HEAD", "CISO", "CEO" and "SERVICE_DESK") are present in the system and create an admin HR account.
     *
     * @throws Exception if an error occurs during role initialization.
     */
    @PostConstruct
    public void init() throws Exception {
        approveRoleService.initializeRoles(Arrays.asList("APPLICANT", "HR", "PROJECT_MANAGER", "DEPARTMENT_HEAD", "DIVISION_HEAD", "CISO", "CEO", "SERVICE_DESK"));
        userService.createHR();
        workFlowOrderService.createDefaultWorkFlowOrder();
    }
}
