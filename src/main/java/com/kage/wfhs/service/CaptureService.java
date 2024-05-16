/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.service;

import org.springframework.stereotype.Service;

import com.kage.wfhs.dto.CaptureDto;

@Service
public interface CaptureService {
	void createCapture(CaptureDto captureDto);

    CaptureDto getCaptureById(long id);
    CaptureDto getCaptureByRegisterForm(long id);
}
