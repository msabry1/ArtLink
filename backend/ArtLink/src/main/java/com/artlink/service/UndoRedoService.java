package com.artlink.service;

import  com.artlink.enums.ActionType ;
import com.artlink.model.dto.UndoRedoDto;
import com.artlink.model.shapes.Shape;
import com.artlink.repository.RedisShapesRepository;
import com.artlink.repository.RedisUndoRedoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class UndoRedoService {
    private final RedisUndoRedoRepository redisUndoRepository;
    private final RedisUndoRedoRepository redisRedoRepository;
    private final ActionHandlerService actionHandlerService;

    @Autowired
    public UndoRedoService(@Qualifier("redisUndoRepository") RedisUndoRedoRepository undoRepository,
                           @Qualifier("redisRedoRepository") RedisUndoRedoRepository redoRepository,
                           ActionHandlerService actionHandlerService) {
        this.redisUndoRepository = undoRepository;
        this.redisRedoRepository = redoRepository;
        this.actionHandlerService = actionHandlerService;
    }

    public void recordUndoAction(String paint_id,UndoRedoDto undoRedoDto) {
        UndoRedoDto reversedAction = actionHandlerService.reverseAction(undoRedoDto,paint_id);
        redisUndoRepository.add(paint_id,reversedAction);
    }

    public UndoRedoDto undo(String paint_id){
        if (redisUndoRepository.size(paint_id) == 0) {
            return null;
        }
        UndoRedoDto undoRedoDto = redisUndoRepository.pop(paint_id) ;
        UndoRedoDto reversedAction = actionHandlerService.reverseAction(undoRedoDto,paint_id);
        redisRedoRepository.add(paint_id,reversedAction);

        return undoRedoDto;
    }
    public UndoRedoDto redo(String paint_id){
        if (redisRedoRepository.size(paint_id) == 0) {
            return null;
        }
        UndoRedoDto redoDto = redisRedoRepository.pop(paint_id) ;
        UndoRedoDto reversedAction = actionHandlerService.reverseAction(redoDto,paint_id);
        redisUndoRepository.add(paint_id,reversedAction);

        return redoDto;
    }
}
