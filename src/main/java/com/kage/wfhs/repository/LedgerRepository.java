package com.kage.wfhs.repository;

import com.kage.wfhs.model.Ledger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LedgerRepository extends JpaRepository<Ledger,Long> {
    Ledger findById(long id);
}
