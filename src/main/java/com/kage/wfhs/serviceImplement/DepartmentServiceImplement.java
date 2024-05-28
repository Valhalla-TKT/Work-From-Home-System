/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.serviceImplement;

import com.kage.wfhs.dto.DepartmentDto;
import com.kage.wfhs.exception.EntityNotFoundException;
import com.kage.wfhs.model.Department;
import com.kage.wfhs.model.Division;
import com.kage.wfhs.repository.DepartmentRepository;
import com.kage.wfhs.service.DepartmentService;
import com.kage.wfhs.util.EntityUtil;

import lombok.AllArgsConstructor;
import com.kage.wfhs.repository.DivisionRepository;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class DepartmentServiceImplement implements DepartmentService {

	@Autowired
    private final DepartmentRepository departmentRepo;
    private final DivisionRepository divisionRepo;
    private final ModelMapper modelMapper;


    @Override
    public DepartmentDto createDepartment(DepartmentDto departmentDto) {
        Department department = modelMapper.map(departmentDto, Department.class);

        if (departmentDto.getDivisionId() > 0) {
            Division division = divisionRepo.findById(departmentDto.getDivisionId())
                    .orElseThrow(() -> new EntityNotFoundException("Division not found"));
            department.setDivision(division);
        } else {
            department.setDivision(null);
        }

        Department savedDepartment = EntityUtil.saveEntity(departmentRepo, department, "department");
        return modelMapper.map(savedDepartment, DepartmentDto.class);
    }

    @Override
    public List<DepartmentDto> getAllDepartment() {
        Sort sort = Sort.by(Sort.Direction.ASC, "code");
        List<Department> departments = EntityUtil.getAllEntities(departmentRepo, sort, "department");
        return departments.stream()
                        .map(department -> modelMapper.map(department, DepartmentDto.class))
                        .collect(Collectors.toList());
    }


    @Override
    public DepartmentDto getDepartmentById(long id) {
    	Department department = departmentRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Department not found"));
        if(department.getDivision() == null) {
            department.setDivision(divisionRepo.findByDepartmentId(id));
        }
        return modelMapper.map(department, DepartmentDto.class);
    }
    
    @Override
    public DepartmentDto getDepartmentByName(String name) {
    	Department department = departmentRepo.findByName(name)
                .orElseThrow(() -> new EntityNotFoundException("Department not found"));
    	return modelMapper.map(department, DepartmentDto.class);
    }

    @Override
	public void updateDepartment(DepartmentDto departmentDto) {
		Department department = departmentRepo.findById(departmentDto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Department not found"));
        if(department == null) {
            throw new EntityNotFoundException("Department not found");
        } else {
            modelMapper.map(departmentDto, department);
            if(departmentDto.getDivisionId() == 0) { 
                department.setDivision(divisionRepo.findByDepartmentId(departmentDto.getId()));
            } else {
                Division division = divisionRepo.findById(departmentDto.getDivisionId())
                        .orElseThrow(() -> new EntityNotFoundException("Division not found"));
                if (division == null) {
                    throw new EntityNotFoundException("Division not found");
                }
                department.setDivision(division);
            }            
            departmentRepo.save(department);
        }
	}
	
	@Override
    public void deleteDepartmentById(long id) {
        EntityUtil.deleteEntity(departmentRepo, id, "Department");
    }
}