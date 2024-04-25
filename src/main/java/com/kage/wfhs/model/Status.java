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
