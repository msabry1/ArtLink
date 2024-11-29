package com.artlink.service;

import com.artlink.model.dto.UndoRedoRepositoryDto;
import com.artlink.repository.RedisUndoRedoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class DrawingAndUndoRedoService {
    private final RedisUndoRedoRepository redisUndoRepository;
    private final RedisUndoRedoRepository redisRedoRepository;
    private final ActionHandlerService actionHandlerService;

    @Autowired
    public DrawingAndUndoRedoService(@Qualifier("redisUndoRepository") RedisUndoRedoRepository undoRepository,
                                     @Qualifier("redisRedoRepository") RedisUndoRedoRepository redoRepository,
                                     ActionHandlerService actionHandlerService) {
        this.redisUndoRepository = undoRepository;
        this.redisRedoRepository = redoRepository;
        this.actionHandlerService = actionHandlerService;
    }

    public void saveActionAndShape(String paint_id, UndoRedoRepositoryDto undoRedoRepositoryDto) {
        UndoRedoRepositoryDto reversedAction = actionHandlerService.handleAndReverseAction(undoRedoRepositoryDto,paint_id);
        redisUndoRepository.add(paint_id,reversedAction);
    }

    public UndoRedoRepositoryDto undo(String paint_id){
        if (redisUndoRepository.size(paint_id) == 0) {
            return null;
        }
        UndoRedoRepositoryDto undoRedoRepositoryDto = redisUndoRepository.pop(paint_id) ;
        UndoRedoRepositoryDto reversedAction = actionHandlerService.handleAndReverseAction(undoRedoRepositoryDto,paint_id);
        redisRedoRepository.add(paint_id,reversedAction);

        return undoRedoRepositoryDto;
    }
    public UndoRedoRepositoryDto redo(String paint_id){
        if (redisRedoRepository.size(paint_id) == 0) {
            return null;
        }
        UndoRedoRepositoryDto redoDto = redisRedoRepository.pop(paint_id) ;
        UndoRedoRepositoryDto reversedAction = actionHandlerService.handleAndReverseAction(redoDto,paint_id);
        redisUndoRepository.add(paint_id,reversedAction);

        return redoDto;
    }
}
