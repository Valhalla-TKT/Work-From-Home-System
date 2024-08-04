///*
// * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
// * @Date 		 : 2024-04-24
// * @Time  		 : 21:00
// * @Project_Name : Work From Home System
// * @Contact      : tktvalhalla@gmail.com
// */
//package com.kage.wfhs.model;
//
//import java.io.Serializable;
//import java.util.List;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//
//import jakarta.persistence.CascadeType;
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.OneToMany;
//import jakarta.persistence.Table;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import lombok.ToString;
//
//@Entity
//@Table(name="notification_type")
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//public class NotificationType implements Serializable {
//
//	private static final long serialVersionUID = 1L;
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    private String name;
//    private String description;
//
//    @OneToMany(mappedBy = "notificationType", cascade = CascadeType.ALL)
//    @ToString.Exclude
//    @JsonIgnore
//    private List<Notification> notification;
//}
