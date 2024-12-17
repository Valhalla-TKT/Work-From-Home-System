/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.api.departments.repository;

import com.kage.wfhs.api.departments.model.Department;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department,Long> {	
	Optional<Department> findByName(String name);
	void deleteById(Long id);

	@Query("SELECT d FROM Department d JOIN d.teams t WHERE t.id = :teamId")
    Department findByTeamId(@Param("teamId") Long teamId);

    List<Department> findAllByDivisionId(Long divisionId);

    boolean existsByName(String name);
}
