/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.model;



public enum Status {
    REJECT(0),
    PENDING(0.5),
    APPROVE(1);
    private final double value;
    Status(double value){
        this.value = value;
    }
    public double getValue(){
        return value;
    }
}
