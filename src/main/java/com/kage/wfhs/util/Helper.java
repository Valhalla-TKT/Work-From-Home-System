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
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.stream.Collectors;

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

    /**
     * Populates a list of managed entities from a list of user approval role entities.
     * This method maps the user approval role entities to their respective managed entities
     * and applies the list to the provided setter function.
     *
     * Example Usage:
     * <pre>
     * {@code
     * List<UserApproveRoleTeam> userApproveRoleTeams = userApproveRoleTeamRepo.findByUserId(userDto.getId());
     * Helper.populateManagedEntity(userApproveRoleTeams, UserApproveRoleTeam::getTeam, userDto::setManagedTeams);
     * }
     * </pre>
     *
     * @param userApproveRoleEntities the list of user approval role entities
     * @param mapper                  the function to map the user approval role entity to the managed entity
     * @param setter                  the function to set the managed entities list in the DTO
     * @param <E>                     the type of the user approval role entity
     * @param <T>                     the type of the managed entity
     */
    public static <E, T> void populateManagedEntity(List<E> userApproveRoleEntities, Function<E, T> mapper, Consumer<List<T>> setter) {
        if (userApproveRoleEntities != null && !userApproveRoleEntities.isEmpty()) {
            List<T> managedEntityList = userApproveRoleEntities.stream()
                    .map(mapper)
                    .filter(Objects::nonNull)
                    .toList();
            setter.accept(managedEntityList);
        }
    }

    /**
     * Extracts names from a list of user approval role entities and returns them as a comma-separated string.
     * This method maps the user approval role entities to their respective names using the provided mapper
     * and name extractor functions.
     *
     * Example Usage:
     * <pre>
     * {@code
     * String managedTeamName = Helper.getNames(userApproveRoleTeams, UserApproveRoleTeam::getTeam, Team::getName);
     * }
     * </pre>
     *
     * @param userApproveRoleEntities the list of user approval role entities
     * @param mapper                  the function to map the user approval role entity to the managed entity
     * @param nameExtractor           the function to extract the name from the managed entity
     * @param <E>                     the type of the user approval role entity
     * @param <T>                     the type of the managed entity
     * @return                        a comma-separated string of names
     */
    public static <E, T> String getNames(List<E> userApproveRoleEntities, Function<E, T> mapper, Function<T, String> nameExtractor) {
        return userApproveRoleEntities.stream()
                .map(mapper)
                .filter(Objects::nonNull)
                .map(nameExtractor)
                .collect(Collectors.joining("| "));
    }

    public static Date[] getStartAndEndOfCurrentMonth() {
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.DAY_OF_MONTH, 1);
        Date startOfMonth = cal.getTime();

        cal.add(Calendar.MONTH, 1);
        cal.set(Calendar.DAY_OF_MONTH, 0);
        Date endOfMonth = cal.getTime();

        return new Date[] { startOfMonth, endOfMonth };
    }
}
