/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User implements Serializable {
	private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "staff_id", length = 8, nullable = false)
    private String staffId;
    
    @Column(name = "name", length = 50, nullable = false)
    private String name;
    
    @Column(name = "email", length = 70, nullable = false, unique = true)
    private String email;
    
    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "gender", length = 6, nullable = false)
    private String gender;

    @Column(name = "created_at", nullable = false, updatable = false)
    private long createdAt;
    
    // for security
    private boolean enabled;
    
    @Column(columnDefinition = "TEXT")
    private String profile;
    
    @Column(columnDefinition = "TEXT")
    private String signature;

    private String positionName;

    @ManyToOne
    @JoinColumn(name = "team_id")
    @JsonIgnore
    private Team team;

    @ManyToOne
    @JoinColumn(name = "department_id")
    @JsonIgnore
    private Department department;

    @ManyToOne
    @JoinColumn(name = "division_id")
    @JsonIgnore
    private Division division;

//    private ActiveStatus activeStatus;
//
//    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL)
//    @ToString.Exclude
//    private List<Chat> chats;
//
//    @OneToMany(mappedBy = "receiver", cascade = CascadeType.ALL)
//    @ToString.Exclude
//    private List<Chat> chatList;
//
//    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL)
//    @ToString.Exclude
//    @JsonIgnore
//    private List<Notification> sentNotifications;
//
//    @OneToMany(mappedBy = "receiver", cascade = CascadeType.ALL)
//    @ToString.Exclude
//    @JsonIgnore
//    private List<Notification> receivedNotifications;

    @OneToMany(mappedBy = "applicant", cascade = CascadeType.ALL)
    @ToString.Exclude
    @JsonIgnore
    private List<RegisterForm> registerForms;

    @OneToMany(mappedBy = "requester", cascade = CascadeType.ALL)
    @ToString.Exclude
    @JsonIgnore
    private List<RegisterForm> registerFormList;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
	@ToString.Exclude
    private List<WorkFlowStatus> workFlowStatuses;
    
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "user_has_approve_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "approve_role_id"))
    @JsonIgnore
	@ToString.Exclude
    private Set<ApproveRole> approveRoles;

    private boolean isFirstTimeLogin;
    
    private int loginCount;

    private boolean resetFlag = false;
    
    @PrePersist
    protected void onCreate() {
        isFirstTimeLogin = true;
        createdAt = System.currentTimeMillis();
    }
}

