package com.kage.wfhs.api.user_approve_role_department.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kage.wfhs.api.user_approve_role_department.model.UserApproveRoleDepartment;

public interface UserApproveRoleDepartmentRepository extends JpaRepository<UserApproveRoleDepartment, Long>{

	List<UserApproveRoleDepartment> findByUserId(Long id);

}
