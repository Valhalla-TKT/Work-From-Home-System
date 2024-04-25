package com.kage.wfhs.service;

import org.springframework.stereotype.Service;

import com.kage.wfhs.dto.CaptureDto;

@Service
public interface CaptureService {
	void createCapture(CaptureDto captureDto);

    CaptureDto getCaptureById(long id);
    CaptureDto getCaptureByRegisterForm(long id);
}
