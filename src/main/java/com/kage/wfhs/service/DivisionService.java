package com.kage.wfhs.service;

import com.kage.wfhs.dto.DivisionDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DivisionService {
	DivisionDto createDivision(DivisionDto division);
    DivisionDto getDivisionById(long id);
    DivisionDto getDivisionByName(String name);
    
    void updateDivision(long id, DivisionDto divisionDto);
    void deleteDivisionById(long id);

    List<DivisionDto> getAllDivision();
}
