/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-08-09
 * @Time  		 : 08:36
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.api.user_approve_role_division.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kage.wfhs.api.approve_roles.model.ApproveRole;
import com.kage.wfhs.api.divisions.model.Division;
import com.kage.wfhs.api.users.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Table(name = "user_approve_role_division")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserApproveRoleDivision implements Serializable {
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
    @JoinColumn(name = "division_id", nullable = false)
    @JsonIgnore
    private Division division;
}
