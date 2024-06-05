/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "ledger")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Ledger implements Serializable {
	private static final long serialVersionUID = 1L;
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String department;
    private String team;
    private String staffId;
    private String name;
    private String email;
    private Date applied_date;
    private Date from_date;
    private Date to_date;
    @Column(columnDefinition = "TEXT")
    private String workcation;
    private double request_percent;
    private String use_own_facilities;
    private String computer;
    private String monitor;
    private String ups;
    private String phone;
    private String other;
    private String environment_facilities;
    private Status project_manager_approve;
    private Date project_manager_approve_date;
    private Status department_head_approve;
    private Date department_head_approve_date;
    private Status division_head_approve;
    private Date division_head_approve_date;
    private Status ciso_approve;
    private Date ciso_approve_date;
    private Status ceo_approve;
    private Date final_approve_date;
    private Date signed_pledge_letter_date;
    @Column(columnDefinition = "TEXT")
    private String reason_for_wfh;

    private long hr_id;
    private Date hr_approve_date;

}
