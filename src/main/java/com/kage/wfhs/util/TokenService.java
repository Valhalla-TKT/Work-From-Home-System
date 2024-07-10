/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-07-07
 * @Time  		 : 18:18
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.util;

import org.apache.commons.codec.binary.Base64;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TokenService {

    private final Map<String, Integer> tokenStore = new ConcurrentHashMap<>();

    public String generateSecureToken(int formId) {
        String uuid = UUID.randomUUID().toString();
        return Base64.encodeBase64URLSafeString(uuid.getBytes());
    }

    public void storeTokenMapping(String formToken, int formId) {
        tokenStore.put(formToken, formId);
    }

    public int getFormIdByToken(String formToken) {
        Integer formId = tokenStore.get(formToken);
        if (formId == null) {
            throw new IllegalArgumentException("Invalid or expired token");
        }
        return formId;
    }
}
