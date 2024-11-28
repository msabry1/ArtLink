package com.artlink;

import com.artlink.model.dto.DrawingActionDto;
import com.artlink.model.dto.UndoRedoDto;
import com.artlink.model.shapes.Shape;
import com.artlink.repository.RedisShapesRepository;
import com.artlink.service.UndoRedoService;
import com.artlink.service.ShapesMappingService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class controller {
    UndoRedoService undoRedoService;
    ShapesMappingService shapesMappingService;
    RedisShapesRepository redisShapesRepository;

    @Autowired
    public controller(UndoRedoService undoRedoService, ShapesMappingService shapesMappingService, RedisShapesRepository redisShapesRepository) {
        this.undoRedoService = undoRedoService;
        this.shapesMappingService = shapesMappingService;
        this.redisShapesRepository = redisShapesRepository;
    }
    @GetMapping("/shape")
    public DrawingActionDto getShape(@RequestBody  String message) throws JsonProcessingException {
        DrawingActionDto dto1 = shapesMappingService.handleJsonMapping(message);
        redisShapesRepository.findShape(dto1.getPaintId(),dto1.getShape().getId());
        return dto1;
    }
    @PostMapping("/shape")
    public DrawingActionDto setShape(@RequestBody  String message) throws JsonProcessingException {
        DrawingActionDto dto1 = shapesMappingService.handleJsonMapping(message);
        undoRedoService.recordUndoAction(dto1.getPaintId(), UndoRedoDto.builder().action(dto1.getAction()).shape(dto1.getShape()).build());
        return dto1;
    }
    @GetMapping("/shapes")
    public Map<String, Shape> getAllShape(@RequestBody  String message) throws JsonProcessingException {
        DrawingActionDto dto1 = shapesMappingService.handleJsonMapping(message);
        return redisShapesRepository.findAllShapes(dto1.getPaintId());
    }
    @GetMapping("/undo")
    public DrawingActionDto undo(@RequestBody  String message) throws JsonProcessingException {
        DrawingActionDto dto1 = shapesMappingService.handleJsonMapping(message);
        UndoRedoDto undoRedoDto =  undoRedoService.undo(dto1.getPaintId()) ;
        return DrawingActionDto.builder()
                .action(undoRedoDto.getAction())
                .shape(undoRedoDto.getShape())
                .type(undoRedoDto.getShape().getClass().getSimpleName().toLowerCase())
                .paintId(dto1.getPaintId())
                .build();
    }
    @GetMapping("/redo")
    public DrawingActionDto redo(@RequestBody  String message) throws JsonProcessingException {
        DrawingActionDto dto1 = shapesMappingService.handleJsonMapping(message);
        UndoRedoDto undoRedoDto =  undoRedoService.redo(dto1.getPaintId()) ;
        return DrawingActionDto.builder()
                .action(undoRedoDto.getAction())
                .shape(undoRedoDto.getShape())
                .type(undoRedoDto.getShape().getClass().getSimpleName().toLowerCase())
                .paintId(dto1.getPaintId())
                .build();
    }
}
