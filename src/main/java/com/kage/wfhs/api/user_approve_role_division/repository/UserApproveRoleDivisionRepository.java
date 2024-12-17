package com.kage.wfhs.api.user_approve_role_division.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kage.wfhs.api.user_approve_role_division.model.UserApproveRoleDivision;

public interface UserApproveRoleDivisionRepository extends JpaRepository<UserApproveRoleDivision, Long>{

	List<UserApproveRoleDivision> findByUserId(Long id);

}
