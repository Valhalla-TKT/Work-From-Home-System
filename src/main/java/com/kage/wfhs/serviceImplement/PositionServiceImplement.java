/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.serviceImplement;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kage.wfhs.dto.PositionDto;
import com.kage.wfhs.model.Position;
import com.kage.wfhs.repository.PositionRepository;
import com.kage.wfhs.service.PositionService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PositionServiceImplement implements PositionService {
    @Autowired
    private final PositionRepository positionRepo;
    private final ModelMapper modelMapper;


    @Override
    public PositionDto createPosition(PositionDto positionDto) {
        Position position = modelMapper.map(positionDto, Position.class);
        positionRepo.save(position);
        return positionDto;
    }

    @Override
    public List<PositionDto> getAllPosition() {
        List<Position> positions = positionRepo.findAll();
        List<PositionDto> positionList = new ArrayList<>();
        for(Position position : positions){
            PositionDto positionDto = modelMapper.map(position, PositionDto.class);
            positionList.add(positionDto);
        }
        return positionList;
    }

    @Override
    public PositionDto getPositionById(long id) {
        Position position = positionRepo.findById(id);
        return modelMapper.map(position, PositionDto.class);
    }

    @Override
    public PositionDto getPositionByName(String name) {
        Position position = positionRepo.findByName(name);
        return modelMapper.map(position, PositionDto.class);
    }

    @Override
    public void updatePosition(PositionDto positionDto) {
        Position position = positionRepo.findById(positionDto.getId());
        position.setName(positionDto.getName());
        positionRepo.save(position);
    }

    @Override
    public void deletePositionById(long id) {
        positionRepo.deleteById(id);
    }
}