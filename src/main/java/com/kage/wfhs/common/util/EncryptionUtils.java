package com.kage.wfhs.common.util;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import javax.crypto.spec.IvParameterSpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class EncryptionUtils {

    private static final String SECRET_KEY = "Gwn73w9T/Pwc9TtjxRKAwNcQGKaYS0qEPag3g7Rrvhc=";
    private static final String INIT_VECTOR = "vvet8AgpRA/ZN5yVQq7MRA==";

    public static String encrypt(String data) {
        try{
            byte[] secretKeyBytes = Base64.getDecoder().decode(SECRET_KEY);
            byte[] ivBytes = Base64.getDecoder().decode(INIT_VECTOR);

            if (secretKeyBytes.length != 32) {
                throw new IllegalArgumentException("Invalid AES key length: " + secretKeyBytes.length);
            }

            if (ivBytes.length != 16) {
                throw new IllegalArgumentException("Invalid IV length: " + ivBytes.length);
            }

            IvParameterSpec iv = new IvParameterSpec(ivBytes);

            SecretKeySpec secretKey = new SecretKeySpec(secretKeyBytes, "AES");

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.ENCRYPT_MODE, secretKey, iv);

            byte[] encrypted = cipher.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(encrypted);
        } catch (Exception e) {
            System.err.println("Error during encryption: " + e.getMessage());
            throw new RuntimeException("Encryption failed", e);
        }
    }

    public static String decrypt(String encryptedData) throws Exception {
        try {
            byte[] secretKeyBytes = Base64.getDecoder().decode(SECRET_KEY);
            byte[] ivBytes = Base64.getDecoder().decode(INIT_VECTOR);

            if (secretKeyBytes.length != 32) {
                throw new IllegalArgumentException("Invalid AES key length: " + secretKeyBytes.length);
            }

            if (ivBytes.length != 16) {
                throw new IllegalArgumentException("Invalid IV length: " + ivBytes.length);
            }

            IvParameterSpec iv = new IvParameterSpec(ivBytes);
            SecretKeySpec secretKey = new SecretKeySpec(secretKeyBytes, "AES");

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, secretKey, iv);

            byte[] original = cipher.doFinal(Base64.getDecoder().decode(encryptedData));
            return new String(original, StandardCharsets.UTF_8);
        } catch (Exception e) {
            System.err.println("Error during decryption: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Decryption failed", e);
        }
    }
}
