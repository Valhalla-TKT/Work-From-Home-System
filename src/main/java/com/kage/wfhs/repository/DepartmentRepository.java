package com.kage.wfhs.repository;

import com.kage.wfhs.model.Department;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department,Long> {
	Department findById(long id);
	Department findByName(String name);
	Department deleteById(long id);
	List<Department> findAllByOrderByCodeAsc();
}
