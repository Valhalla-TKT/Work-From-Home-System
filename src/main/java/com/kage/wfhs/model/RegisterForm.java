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
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "register_form")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RegisterForm implements Serializable {
	private static final long serialVersionUID = 1L;
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "TEXT")
    private String workingPlace;
    private double requestPercent;
    private Date fromDate;
    private Date toDate;
    @Column(columnDefinition = "TEXT")
    private String requestReason;

    @Column(columnDefinition = "LONGTEXT")
    private String signature;
    private Date signedDate;
    
    @Enumerated(EnumType.STRING)
    private Status status;
    
    @OneToOne(mappedBy = "registerForm", cascade = CascadeType.ALL)
    @JsonIgnore
    @ToString.Exclude
    private Capture capture;

    @OneToMany(mappedBy = "registerForm", cascade = CascadeType.ALL)
    @JsonIgnore
    @ToString.Exclude
    private List<WorkFlowStatus> workFlowStatuses;

    @ManyToOne
    @JoinColumn(name = "applicant_id")
    @JsonIgnore
	@ToString.Exclude
    private User applicant;

    @ManyToOne
    @JoinColumn(name = "requester_id")
    @JsonIgnore
	@ToString.Exclude
    private User requester;

}
