/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.serviceImplement;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.kage.wfhs.dto.DivisionDto;
import com.kage.wfhs.model.Division;
import com.kage.wfhs.repository.DivisionRepository;
import com.kage.wfhs.service.DivisionService;
import com.kage.wfhs.util.Helper;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DivisionServiceImplement implements DivisionService {
    @Autowired
    private final DivisionRepository divisionRepo;
    private final ModelMapper modelMapper;
    
    @Autowired
    private final Helper helper;

    @Override
    public DivisionDto createDivision(DivisionDto divisionDto) {
        Division division = modelMapper.map(divisionDto, Division.class);
        divisionRepo.save(division);
        return divisionDto;
    }

    @Override
    public List<DivisionDto> getAllDivision() {
    	Sort sort = Sort.by(Sort.Direction.ASC, "code");
        List<Division> divisions = divisionRepo.findAll(sort);
        List<DivisionDto> divisionList = new ArrayList<>();
        for (Division division : divisions){
            DivisionDto divisionDto = modelMapper.map(division, DivisionDto.class);
            System.out.println("hi");
            divisionDto.setLastCode(helper.getLastDivisionCode());
            System.out.println(helper.getLastDivisionCode());
            divisionList.add(divisionDto);
        }
        return divisionList;
    }

    @Override
    public DivisionDto getDivisionById(long id) {
        Division division = divisionRepo.findById(id);
        return modelMapper.map(division, DivisionDto.class);
    }

	@Override
	public DivisionDto getDivisionByName(String name) {
		Division division = divisionRepo.findByName(name);
		return modelMapper.map(division, DivisionDto.class);
	}

	@Override
	public void updateDivision(DivisionDto divisionDto) {
		Division division = divisionRepo.findById(divisionDto.getId());
        if (division == null) {
            throw new EntityNotFoundException("Division not found");
        }
        modelMapper.map(divisionDto, division);
        divisionRepo.save(division);
	}

    @Override
    public void deleteDivisionById(long id) {
        divisionRepo.deleteById(id);
    }
}