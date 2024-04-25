package com.kage.wfhs.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor


public class User implements Serializable {
	private static final long serialVersionUID = 1L;
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String staff_id;
    private String name;
    @Column(unique=true)
    private String email;
    private String phone_number;
    private String password;
    private boolean enabled;
    private String gender;
    @Column(columnDefinition = "TEXT")
    private String profile;
    private boolean marital_status;
    private boolean parent;
    private boolean children;
    private Date join_date;
    private Date permanent_date;
    private String signature;
    private ActiveStatus activeStatus;

    @ManyToOne
    @JoinColumn(name = "role_id")
    @JsonIgnore
	@ToString.Exclude
    private Role role;

    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Chat> chats;

    @OneToMany(mappedBy = "receiver", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Chat> chatList;

    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Notification> sentNotifications;
    
    @OneToMany(mappedBy = "receiver", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Notification> receivedNotifications;

    @ManyToOne
    @JoinColumn(name = "position_id")
    @ToString.Exclude
    @JsonIgnore
    private Position position;

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

    @ManyToOne
    @JoinColumn(name = "team_id")
    @ToString.Exclude
    @JsonIgnore
    private Team team;

    @ManyToOne
    @JoinColumn(name = "department_id")
    @ToString.Exclude
    @JsonIgnore
    private Department department;

    @ManyToOne
    @JoinColumn(name = "division_id")
    @ToString.Exclude
    @JsonIgnore
    private Division division;
    
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "user_has_approve_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "approve_role_id"))
    @JsonIgnore
	@ToString.Exclude
    private Set<ApproveRole> approveRoles;




}

