package com.kage.wfhs.repository;

import com.kage.wfhs.model.Team;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends JpaRepository<Team,Long> {
	Team findById(long id);
	Team findByName(String name);
	Team deleteById(long id);
	List<Team> findAllByOrderByCodeAsc();
}
