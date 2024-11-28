package com.artlink.service;

import com.artlink.enums.ActionType;
import com.artlink.model.dto.UndoRedoDto;
import com.artlink.model.shapes.Shape;
import com.artlink.repository.RedisShapesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActionHandlerService {

    private final RedisShapesRepository redisShapesRepository;

    @Autowired
    public ActionHandlerService(RedisShapesRepository redisShapesRepository) {
        this.redisShapesRepository = redisShapesRepository;
    }

    public UndoRedoDto reverseAction(UndoRedoDto undoRedoDto, String paint_id) {
        return switch (undoRedoDto.getAction()) {
            case ActionType.MODIFIED -> reverseModifiedAction(undoRedoDto, paint_id);
            case ActionType.ADDED -> reverseAddedAction(undoRedoDto, paint_id);
            case ActionType.DELETED -> reverseDeletedAction(undoRedoDto, paint_id);
            default -> throw new IllegalArgumentException("Invalid Action");
        };
    }

    private UndoRedoDto reverseModifiedAction(UndoRedoDto undoRedoDto, String paint_id) {
        Shape cachedShape = redisShapesRepository.findShape(
                paint_id,
                undoRedoDto.getShape().getId()
        );
        redisShapesRepository.saveShape(paint_id, undoRedoDto.getShape());
        return UndoRedoDto.builder()
                .action(ActionType.MODIFIED)
                .shape(cachedShape)
                .build();
    }

    private UndoRedoDto reverseAddedAction(UndoRedoDto undoRedoDto, String paint_id) {
        redisShapesRepository.saveShape(paint_id, undoRedoDto.getShape());
        return UndoRedoDto.builder()
                .action(ActionType.DELETED)
                .shape(undoRedoDto.getShape())
                .build();
    }

    private UndoRedoDto reverseDeletedAction(UndoRedoDto undoRedoDto, String paint_id) {
        redisShapesRepository.deleteShape(paint_id, undoRedoDto.getShape());
        return UndoRedoDto.builder()
                .action(ActionType.ADDED)
                .shape(undoRedoDto.getShape())
                .build();
    }
}
