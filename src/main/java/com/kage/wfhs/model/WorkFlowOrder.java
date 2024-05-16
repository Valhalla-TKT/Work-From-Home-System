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

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "work_flow_order")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class WorkFlowOrder implements Serializable {
	private static final long serialVersionUID = 1L;
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String approve_state;

    @ManyToOne
    @JoinColumn(name = "approve_role_id")
    @JsonIgnore
    @ToString.Exclude
    private ApproveRole approveRole;

}
