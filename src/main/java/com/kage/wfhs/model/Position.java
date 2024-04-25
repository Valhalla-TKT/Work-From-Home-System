package com.kage.wfhs.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="position")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Position implements Serializable {
	private static final long serialVersionUID = 1L;
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;

    @OneToMany(mappedBy = "position", cascade = CascadeType.ALL)
    @ToString.Exclude
    @JsonIgnore
    private List<User> users;


}
