package com.kage.wfhs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kage.wfhs.model.UserApproveRoleDivision;

public interface UserApproveRoleDivisionRepository extends JpaRepository<UserApproveRoleDivision, Long>{

	List<UserApproveRoleDivision> findByUserId(Long id);

}
