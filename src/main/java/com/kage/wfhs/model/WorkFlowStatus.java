package com.kage.wfhs.model;

import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="work_flow_status")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class WorkFlowStatus implements Serializable {
	private static final long serialVersionUID = 1L;
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Enumerated(EnumType.STRING)
    private Status status;
    @Column(columnDefinition = "TEXT")
    private String reason;
    private Date approve_date;

    @ManyToOne
    @JoinColumn(name = "register_form_id")
    @JsonIgnore
	@ToString.Exclude
    private RegisterForm registerForm;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
	@ToString.Exclude
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "approve_role_id")
    @JsonIgnore
	@ToString.Exclude
    private ApproveRole approveRole;

	@Override
	public String toString() {
		return "WorkFlowStatus [id=" + id + ", status=" + status + ", reason=" + reason + ", approve_date="
				+ approve_date + ", registerForm=" + registerForm + ", user=" + user + "]";
	}


}
