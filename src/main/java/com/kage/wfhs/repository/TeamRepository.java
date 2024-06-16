/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.repository;

import com.kage.wfhs.model.Team;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends JpaRepository<Team,Long> {
	void deleteById(Long id);
	Optional<Team> findByName(String name);

    List<Team> findAllByDepartmentId(Long departmentId);

    @Query("SELECT t FROM Team t WHERE t.department.division.id = :divisionId")
    List<Team> findAllByDivisionId(@Param("divisionId") Long divisionId);
}
