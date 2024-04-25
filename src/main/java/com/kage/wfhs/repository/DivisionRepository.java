package com.kage.wfhs.repository;

import com.kage.wfhs.model.Division;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DivisionRepository extends JpaRepository<Division,Long> {
    Division findById(long id);
    
    Division findByName(String name);
    
    Division findByCode(String code);
    
    @Query(value="SELECT * FROM Division ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Division findLastDivision();
}
