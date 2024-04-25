package com.kage.wfhs.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kage.wfhs.dto.PositionDto;

@Service
public interface PositionService {

	PositionDto createPosition(PositionDto positionDto);
	
	PositionDto getPositionById(long id);
	
	PositionDto getPositionByName(String name);
	
	void updatePosition(long id, PositionDto positionDto);
	
	void  deletePositionById(long id);
	
	List<PositionDto> getAllPosition();
}
