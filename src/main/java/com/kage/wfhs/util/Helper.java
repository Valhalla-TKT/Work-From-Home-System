/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.util;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.text.SimpleDateFormat;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kage.wfhs.model.ApproveRole;
import com.kage.wfhs.model.WorkFlowOrder;
import com.kage.wfhs.repository.ApproveRoleRepository;
import com.kage.wfhs.repository.WorkFlowOrderRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class Helper {

    private static final String uploadDir = "src/main/resources/static/formImages/";

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
        return text.replace(" ", "_");
    }

    private static final SecureRandom random = new SecureRandom();

    public static String saveImage(MultipartFile file) {
        String storageFileName = null;
        if (file != null) {

            Date createdAt = new Date();
            storageFileName = createdAt.getTime() + "_" + file.getOriginalFilename();

            try {
                Path uploadPath = Paths.get(uploadDir);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }
                try (InputStream inputStream = file.getInputStream()) {
                    Files.copy(inputStream, Paths.get(uploadDir + storageFileName),
                            StandardCopyOption.REPLACE_EXISTING);
                }
            } catch (Exception ex) {

                System.out.println("Exception : " + ex.getMessage());
            }
        }
        return "/assets/formImages" + storageFileName;
    }


    public static String updateImage(MultipartFile newFile, String oldImage) {
        String storageFileName = null;
        if (newFile != null) {
            try {
                if (!newFile.isEmpty()) {
                    Date createdAt = new Date();
                    storageFileName = createdAt.getTime() + "_" + newFile.getOriginalFilename();
                    try (InputStream inputStream = newFile.getInputStream()) {
                        Files.copy(inputStream, Paths.get(uploadDir + storageFileName),
                                StandardCopyOption.REPLACE_EXISTING);
                    }
                    if (oldImage != null) {
                        if (oldImage.equals("default-female.jfif") || oldImage.equals("default-male.png")) {
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

    public static String generateOTP(String email, String staffID) {
        try {
            String combined = email + staffID + UUID.randomUUID().toString();

            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(combined.getBytes());

            random.setSeed(hash);

            int otpLength = 6;
            int otp = random.nextInt((int) Math.pow(10, otpLength));
            return String.format("%06d", otp).toUpperCase();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error generating OTP", e);
        }
    }

    public ApproveRole getMaxOrder(Set<ApproveRole> approveRoles) {
        ApproveRole maxApproveRole = Collections.max(approveRoles, Comparator.comparingLong(ApproveRole::getId));
        WorkFlowOrder workFlowOrder = maxApproveRole.getWorkFlowOrders().get(0);
        WorkFlowOrder approves = workFlowOrderRepo.findOrderId(workFlowOrder.getId());
        if (approves == null) {
            //return approveRoleRepo.findById(1);
            return EntityUtil.getEntityById(approveRoleRepo, 1L);
        } else {
            return approves.getApproveRole();
        }
    }

    public static String formatDate(long milliseconds) {
        Date date = new Date(milliseconds);
        SimpleDateFormat dateFormat = new SimpleDateFormat("MMMM dd, yyyy");
        return dateFormat.format(date);
    }
}
