package com.kage.wfhs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kage.wfhs.model.UserApproveRoleTeam;

public interface UserApproveRoleTeamRepository extends JpaRepository<UserApproveRoleTeam, Long>{

	List<UserApproveRoleTeam> findByUserId(Long userId);

}
