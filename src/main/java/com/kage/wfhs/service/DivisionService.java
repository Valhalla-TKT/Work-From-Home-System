/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.service;

import com.kage.wfhs.dto.DivisionDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DivisionService {
	DivisionDto createDivision(DivisionDto division);
    DivisionDto getDivisionById(Long id);
    DivisionDto getDivisionByName(String name);
    
    void updateDivision(DivisionDto divisionDto);
    void deleteDivisionById(Long id);

    List<DivisionDto> getAllDivision();
}
