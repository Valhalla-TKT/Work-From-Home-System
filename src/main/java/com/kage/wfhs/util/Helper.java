package com.kage.wfhs.util;

import com.kage.wfhs.model.ApproveRole;
import com.kage.wfhs.model.WorkFlowOrder;
import com.kage.wfhs.repository.ApproveRoleRepository;
import com.kage.wfhs.repository.WorkFlowOrderRepository;

import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.Set;

@AllArgsConstructor
@Service
public class Helper {

    private static final String uploadDir = "src/main/resources/static/assets/formImages/";
    
    @Autowired
    private final WorkFlowOrderRepository workFlowOrderRepo;
    
    @Autowired
    private final ApproveRoleRepository approveRoleRepo;        
    
    public static String changeToSmallLetter(String text) {
        return text.toLowerCase();
    }

    public static String changeToCapitalLetter(String text) {
        return text.toUpperCase();
    }

    public static String changeSpaceToUnderScore(String text) {
        return text.replace(" ","_");
    }


    public static String saveImage(MultipartFile file) {
        String storageFileName = null;
        if(file != null) {
        		System.out.println(" jifbkdm" + file.getOriginalFilename());
        		
            Date createdAt = new Date();
            storageFileName =createdAt.getTime() + "_" + file.getOriginalFilename();

            try {
                Path uploadPath = Paths.get(uploadDir);
                System.out.println(uploadPath);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }
                try (InputStream inputStream= file.getInputStream()){
                    Files.copy(inputStream,Paths.get(uploadDir + storageFileName),
                            StandardCopyOption.REPLACE_EXISTING);
                }
            } catch (Exception ex) {
            	
                System.out.println("Exception : " + ex.getMessage());
            }
        }
        System.out.println(storageFileName);
        return "/assets/formImages" + storageFileName;
    }


    public static String updateImage(MultipartFile newFile, String oldImage) {
        String storageFileName = null;
        if(newFile != null) {
            try {
                if (!newFile.isEmpty()) {
                    Date createdAt = new Date();
                    storageFileName = createdAt.getTime() + "_" + newFile.getOriginalFilename();
                    try (InputStream inputStream = newFile.getInputStream()) {
                        Files.copy(inputStream, Paths.get(uploadDir + storageFileName),
                                StandardCopyOption.REPLACE_EXISTING);
                    }
                    if (oldImage != null) {
                        if(oldImage.equals("default-female.jfif") || oldImage.equals("default-male.png")){
                        } else {
                            Path oldImagePath = Paths.get(uploadDir + oldImage);
                            Files.delete(oldImagePath);
                        }
                    }
                }
            } catch (Exception ex) {
                System.out.println("IOException occurred: " + ex.getMessage());
                return ex.getMessage();
            }

        }
        return storageFileName;
    }


    public ApproveRole getMaxOrder(Set<ApproveRole> approveRoles){
        ApproveRole maxApproveRole = Collections.max(approveRoles, Comparator.comparingLong(ApproveRole::getId));
        WorkFlowOrder workFlowOrder =   maxApproveRole.getWorkFlowOrders().get(0);
        System.out.println("max approve role's work flow order's id = " + workFlowOrder.getApproveRole().getId());
        WorkFlowOrder getApprover = workFlowOrderRepo.findOrderId(workFlowOrder.getId());
        if (getApprover == null) {
        	return approveRoleRepo.findById(1);
        } else {
        	return getApprover.getApproveRole();
        }
        
    }
}
