/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-07-07
 * @Time  		 : 18:18
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.common.util;

import org.apache.commons.codec.binary.Base64;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TokenService {

    private final Map<String, Long> tokenStore = new ConcurrentHashMap<>();

    public String generateSecureToken(long formId) {
        String uuid = UUID.randomUUID().toString();
        String formToken = Base64.encodeBase64URLSafeString(uuid.getBytes());
        System.out.println("Generated formToken: " + formToken);
        return formToken;
    }

    public void storeTokenMapping(String formToken, long formId) {
        tokenStore.put(formToken, formId);
    }

    public Long getFormIdByToken(String formToken) {
        Long formId = tokenStore.get(formToken);
        if (formId == null) {
            throw new IllegalArgumentException("Invalid or expired token");
        }
        return formId;
    }
}
