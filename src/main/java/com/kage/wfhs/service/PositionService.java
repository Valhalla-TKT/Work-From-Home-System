/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kage.wfhs.dto.PositionDto;

@Service
public interface PositionService {

	PositionDto createPosition(PositionDto positionDto);
	
	PositionDto getPositionById(long id);
	
	PositionDto getPositionByName(String name);
	
	void updatePosition(PositionDto positionDto);
	
	void  deletePositionById(long id);
	
	List<PositionDto> getAllPosition();
}
