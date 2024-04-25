package com.kage.wfhs.serviceImplement;

import com.kage.wfhs.dto.DepartmentDto;
import com.kage.wfhs.model.Department;
import com.kage.wfhs.repository.DepartmentRepository;
import com.kage.wfhs.service.DepartmentService;
import lombok.AllArgsConstructor;
import com.kage.wfhs.repository.DivisionRepository;
import java.util.ArrayList;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
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
        Department department = modelMapper.map(departmentDto,Department.class);
        department.setDivision(departmentDto.getDivisionId() > 0 ? divisionRepo.findById(departmentDto.getDivisionId()) : null);
        departmentRepo.save(department);
        return departmentDto;
    }

    @Override
    public List<DepartmentDto> getAllDepartment() {
    	
        List<Department> departments =  departmentRepo.findAllByOrderByCodeAsc();        
        List<DepartmentDto> departmentList = new ArrayList<>();
        for(Department department : departments){
            DepartmentDto departmentDto = modelMapper.map(department, DepartmentDto.class);
            departmentList.add(departmentDto);            
        }
        return departmentList;
    }
    @Override
    public DepartmentDto getDepartmentById(long id) {
    	Department department = departmentRepo.findById(id);
        return modelMapper.map(department, DepartmentDto.class);
    }
    
    @Override
    public DepartmentDto getDepartmentByName(String name) {
    	Department department = departmentRepo.findByName(name);
    	return modelMapper.map(department, DepartmentDto.class);
    }

    @Override
	public void updateDepartment(long id, DepartmentDto departmentDto) {
		Department department = departmentRepo.findById(id);
		department.setCode(departmentDto.getCode());
		department.setName(departmentDto.getName());
		departmentRepo.save(department);
	}
	
	@Override
    public void deleteDepartmentById(long id) {
        departmentRepo.deleteById(id);
    }


}
