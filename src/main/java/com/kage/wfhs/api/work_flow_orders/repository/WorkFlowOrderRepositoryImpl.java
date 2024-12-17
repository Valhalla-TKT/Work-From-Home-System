package com.kage.wfhs.api.work_flow_orders.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

public class WorkFlowOrderRepositoryImpl implements WorkFlowOrderRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public void truncateTable() {
        entityManager.createNativeQuery("TRUNCATE TABLE work_flow_order").executeUpdate();
    }
}
