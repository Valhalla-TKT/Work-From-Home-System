package com.kage.wfhs.repository;

import com.kage.wfhs.model.Position;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PositionRepository extends JpaRepository<Position,Long> {
	Position findById(long id);
	
	Position findByName(String name);
	
	Position deleteById(long id);
}
