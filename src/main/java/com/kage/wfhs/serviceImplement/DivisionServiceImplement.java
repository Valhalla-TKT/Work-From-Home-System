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
import com.kage.wfhs.exception.EntityNotFoundException;
import com.kage.wfhs.model.Division;
import com.kage.wfhs.repository.DivisionRepository;
import com.kage.wfhs.service.DivisionService;
import com.kage.wfhs.util.EntityUtil;
import com.kage.wfhs.util.Helper;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DivisionServiceImplement implements DivisionService {
    @Autowired
    private final DivisionRepository divisionRepo;
    private final ModelMapper modelMapper;

    @Override
    public DivisionDto createDivision(DivisionDto divisionDto) {
        Division division = modelMapper.map(divisionDto, Division.class);
        Division savedDivision = EntityUtil.saveEntity(divisionRepo, division, "division");
        return modelMapper.map(savedDivision, DivisionDto.class);
    }

    @Override
    public List<DivisionDto> getAllDivision() {
        Sort sort = Sort.by(Sort.Direction.ASC, "createdAt");
        List<Division> divisions = EntityUtil.getAllEntities(divisionRepo, sort, "division");
        if (divisions == null) {
            return null;
        }
        List<DivisionDto> divisionList = new ArrayList<>();
        for (Division division : divisions) {
            DivisionDto divisionDto = modelMapper.map(division, DivisionDto.class);
            divisionDto.setCreatedAtDate(Helper.formatDate(divisionDto.getCreatedAt()));
            divisionList.add(divisionDto);
        }
        return divisionList;
    }

	@Override
    public DivisionDto getDivisionById(Long id) {
        Division division = EntityUtil.getEntityById(divisionRepo, id);
        return modelMapper.map(division, DivisionDto.class);
    }

    @Override
    public DivisionDto getDivisionByName(String name) {
        Division division = divisionRepo.findByName(name)
                .orElseThrow(() -> new EntityNotFoundException("Division not found"));
        return modelMapper.map(division, DivisionDto.class);
    }

    @Override
    public void updateDivision(DivisionDto divisionDto) {
        Division division = EntityUtil.getEntityById(divisionRepo, divisionDto.getId());
        modelMapper.map(divisionDto, division);
        divisionRepo.save(division);
    }

    @Override
    public void deleteDivisionById(Long id) {
        EntityUtil.deleteEntity(divisionRepo, id, "Division");
    }
}