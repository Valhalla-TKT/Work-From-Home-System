package com.kage.wfhs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kage.wfhs.model.UserApproveRoleDepartment;

public interface UserApproveRoleDepartmentRepository extends JpaRepository<UserApproveRoleDepartment, Long>{

	List<UserApproveRoleDepartment> findByUserId(Long id);

}
