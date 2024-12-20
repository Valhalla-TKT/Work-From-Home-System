/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.api.divisions.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kage.wfhs.api.departments.model.Department;
import com.kage.wfhs.api.users.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "division")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Division implements Serializable {
	private static final long serialVersionUID = 1L;
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "name", length = 70, nullable = false)
    private String name;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Long createdAt;

    @OneToMany(mappedBy = "division", cascade = CascadeType.ALL)
    @ToString.Exclude
    @JsonIgnore
    private List<Department> departments;
    
    @OneToMany(mappedBy = "division", cascade = CascadeType.ALL)
    @ToString.Exclude
    @JsonIgnore
    private List<User> users;

    @PrePersist
    protected void onCreate() {createdAt = System.currentTimeMillis();}
}
