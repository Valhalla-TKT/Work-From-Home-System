package com.kage.wfhs.api.work_from_abroad_information.repository;

import com.kage.wfhs.api.work_from_abroad_information.model.WorkFromAbroadInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WorkFromAbroadInformationRepository extends JpaRepository<WorkFromAbroadInformation, Long> {
    Optional<WorkFromAbroadInformation> findByRegisterFormId(Long formId);
}
