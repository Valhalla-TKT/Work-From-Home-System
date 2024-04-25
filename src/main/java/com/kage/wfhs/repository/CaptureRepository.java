package com.kage.wfhs.repository;

import com.kage.wfhs.model.Capture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaptureRepository extends JpaRepository<Capture,Long> {
	Capture findByRegisterFormId(long id);
}
