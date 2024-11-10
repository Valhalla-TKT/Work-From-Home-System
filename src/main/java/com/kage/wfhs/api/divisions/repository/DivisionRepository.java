/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.api.divisions.repository;

import com.kage.wfhs.api.divisions.model.Division;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DivisionRepository extends JpaRepository<Division,Long> {    
    
    Optional<Division> findByName(String name);

    @Query(value="SELECT * FROM Division ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Division findLastDivision();

    @Query("SELECT d FROM Division d JOIN d.departments dept WHERE dept.id = :departmentId")
    Division findByDepartmentId(@Param("departmentId") Long departmentId);

    boolean existsByName(String name);
}
