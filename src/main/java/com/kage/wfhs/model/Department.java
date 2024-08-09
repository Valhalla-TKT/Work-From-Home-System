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
@Table(name = "department")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Department implements Serializable {
	private static final long serialVersionUID = 1L;
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 70, nullable = false)
    private String name;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Long createdAt;

    @ManyToOne
    @JoinColumn(name = "division_id")
    @ToString.Exclude
    @JsonIgnore
    private Division division;
    
    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL)
    @ToString.Exclude
    @JsonIgnore
    private List<Team> teams;
    
    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL)
    @ToString.Exclude
    @JsonIgnore
    private List<User> users;

    @ManyToMany(mappedBy = "departments")
    @ToString.Exclude
    @JsonIgnore
    private Set<ApproveRole> approveRoles;

    @PrePersist
    protected void onCreate() {createdAt = System.currentTimeMillis();}
}
