package com.kage.wfhs.api.user_approve_role_team.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kage.wfhs.api.user_approve_role_team.model.UserApproveRoleTeam;

public interface UserApproveRoleTeamRepository extends JpaRepository<UserApproveRoleTeam, Long>{

	List<UserApproveRoleTeam> findByUserId(Long userId);

}
