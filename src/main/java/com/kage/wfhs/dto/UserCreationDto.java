/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-09-07
 * @Time  		 : 20:20
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserCreationDto {
    private String name;
    private String staffId;
    private String email;
    private String password;
    private String positionName;
    private Long role;
    private Long division;
    private Long department;
    private Long team;
}
