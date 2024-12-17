/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.api.captures.service.impl;

import com.kage.wfhs.api.captures.dto.CaptureDto;
import com.kage.wfhs.api.captures.model.Capture;
import com.kage.wfhs.api.captures.repository.CaptureRepository;
import com.kage.wfhs.api.captures.service.CaptureService;
import lombok.RequiredArgsConstructor;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CaptureServiceImplement implements CaptureService {
	private final CaptureRepository captureRepo;
    private final ModelMapper modelMapper;

    @Override
    public void createCapture(CaptureDto captureDto) {
        Capture capture = modelMapper.map(captureDto, Capture.class);
        captureRepo.save(capture);
    }

    @Override
    public CaptureDto getCaptureById(Long id) {
        return modelMapper.map(captureRepo.findById(id), CaptureDto.class);
    }

    @Override
    public CaptureDto getCaptureByRegisterForm(Long id) {
        return modelMapper.map(captureRepo.findByRegisterFormId(id), CaptureDto.class);
    }
}
