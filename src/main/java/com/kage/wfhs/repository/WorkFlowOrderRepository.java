/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.repository;

import com.kage.wfhs.model.WorkFlowOrder;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkFlowOrderRepository extends JpaRepository<WorkFlowOrder, Long> {
	Optional<WorkFlowOrder> findById(Long id);

    @Query("select order from WorkFlowOrder order where order.id = :id - 1")
    WorkFlowOrder findOrderId(Long id);

    WorkFlowOrder findByApproveRole_Id(Long id);
    
    @Query (value = """
            SELECT wfo.* FROM user u JOIN user_has_approve_role uhar ON u.id = uhar.user_id
            JOIN approve_role ar ON uhar.approve_role_id = ar.id JOIN work_flow_order wfo ON ar.id = wfo.approve_role_id
            WHERE u.id = :userId
            """, nativeQuery = true)
        WorkFlowOrder findByUserId(Long userId);
}
