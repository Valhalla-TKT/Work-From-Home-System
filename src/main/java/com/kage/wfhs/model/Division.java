package com.kage.wfhs.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "division")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Division implements Serializable {
	private static final long serialVersionUID = 1L;
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String code;
    private String name;

    @OneToMany(mappedBy = "division", cascade = CascadeType.ALL)
    @JsonIgnore
    @ToString.Exclude
    private List<Department> departments;
    
    @OneToMany(mappedBy = "division", cascade = CascadeType.ALL)
    @JsonIgnore
    @ToString.Exclude
    private List<User> users;

}
