package com.kage.wfhs.repository;

import com.kage.wfhs.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {
	Role findById(long id);
	Role findByName(String name);
	Role deleteById(long id);
}
