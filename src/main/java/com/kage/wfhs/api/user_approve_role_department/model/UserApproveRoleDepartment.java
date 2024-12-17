/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-08-09
 * @Time  		 : 08:35
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.api.user_approve_role_department.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kage.wfhs.api.approve_roles.model.ApproveRole;
import com.kage.wfhs.api.departments.model.Department;
import com.kage.wfhs.api.users.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Table(name = "user_approve_role_department")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserApproveRoleDepartment implements Serializable {
	private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "approve_role_id", nullable = false)
    @JsonIgnore
    private ApproveRole approveRole;

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    @JsonIgnore
    private Department department;
}
