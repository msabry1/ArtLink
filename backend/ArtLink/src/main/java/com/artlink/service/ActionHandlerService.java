package com.artlink.service;

import com.artlink.enums.ActionType;
import com.artlink.model.dto.UndoRedoRepositoryDto;
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

    public UndoRedoRepositoryDto handleAndReverseAction(UndoRedoRepositoryDto undoRedoRepositoryDto, String paint_id) {
        return switch (undoRedoRepositoryDto.getAction()) {
            case ActionType.MODIFIED -> handleAndReverseModifiedAction(undoRedoRepositoryDto, paint_id);
            case ActionType.ADDED -> handleAndReverseAddedAction(undoRedoRepositoryDto, paint_id);
            case ActionType.DELETED -> handleAndReverseDeletedAction(undoRedoRepositoryDto, paint_id);
            default -> throw new IllegalArgumentException("Invalid Action");
        };
    }

    private UndoRedoRepositoryDto handleAndReverseModifiedAction(UndoRedoRepositoryDto undoRedoRepositoryDto, String paint_id) {
        Shape cachedShape = redisShapesRepository.findShape(
                paint_id,
                undoRedoRepositoryDto.getShape().getId()
        );
        redisShapesRepository.saveShape(paint_id, undoRedoRepositoryDto.getShape());
        return UndoRedoRepositoryDto.builder()
                .action(ActionType.MODIFIED)
                .shape(cachedShape)
                .build();
    }

    private UndoRedoRepositoryDto handleAndReverseAddedAction(UndoRedoRepositoryDto undoRedoRepositoryDto, String paint_id) {
        redisShapesRepository.saveShape(paint_id, undoRedoRepositoryDto.getShape());
        return UndoRedoRepositoryDto.builder()
                .action(ActionType.DELETED)
                .shape(undoRedoRepositoryDto.getShape())
                .build();
    }

    private UndoRedoRepositoryDto handleAndReverseDeletedAction(UndoRedoRepositoryDto undoRedoRepositoryDto, String paint_id) {
        redisShapesRepository.deleteShape(paint_id, undoRedoRepositoryDto.getShape());
        return UndoRedoRepositoryDto.builder()
                .action(ActionType.ADDED)
                .shape(undoRedoRepositoryDto.getShape())
                .build();
    }
}
