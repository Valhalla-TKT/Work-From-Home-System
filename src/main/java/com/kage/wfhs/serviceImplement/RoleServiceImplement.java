/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.serviceImplement;

import com.kage.wfhs.dto.RoleDto;
import com.kage.wfhs.model.Role;
import com.kage.wfhs.repository.RoleRepository;
import com.kage.wfhs.service.RoleService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class RoleServiceImplement implements RoleService {

    @Autowired
    private final RoleRepository roleRepo;
    
    @Autowired
    private final ModelMapper modelMapper;
    @Override
    public RoleDto createRole(RoleDto roleDto) {
        Role role = modelMapper.map(roleDto, Role.class);
        roleRepo.save(role);
        return roleDto;
    }

    @Override
    public List<RoleDto> getAllRole() {
        List<Role> roles = roleRepo.findAll();
        List<RoleDto> roleList = new ArrayList<>();
        for(Role role :  roles){
            RoleDto roleDto = modelMapper.map(role, RoleDto.class);
            roleList.add(roleDto);
        }
        return roleList;
    }

    @Override
    public RoleDto getRoleById(long id) {
        Role role = roleRepo.findById(id);
        return modelMapper.map(role, RoleDto.class);
    }

    @Override
    public RoleDto getRoleByName(String name) {
        Role role = roleRepo.findByName(name);
        return modelMapper.map(role, RoleDto.class);
    }

    @Override
    public void updateRole(RoleDto roleDto) {
        Role role = roleRepo.findById(roleDto.getId());
        role.setName(roleDto.getName());
        roleRepo.save(role);
    }

    @Override
    public void deleteApproverById(long id) {
        roleRepo.deleteById(id);
    }
}
