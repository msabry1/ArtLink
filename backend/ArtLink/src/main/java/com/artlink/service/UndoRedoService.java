package com.artlink.service;

import com.artlink.exceptions.NoMoreRedoAvailableException;
import com.artlink.exceptions.NoMoreUndoAvailableException;
import com.artlink.model.dto.UndoRedoRepositoryDto;
import com.artlink.repository.IUndoRedoCacheRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class UndoRedoService {
    private final IUndoRedoCacheRepository undoRepository;
    private final IUndoRedoCacheRepository redoRepository;
    private final ActionHandlerService actionHandlerService;

    @Autowired
    public UndoRedoService(@Qualifier("undo_Repository") IUndoRedoCacheRepository undoRepository,
                           @Qualifier("redo_Repository") IUndoRedoCacheRepository redoRepository,
                           ActionHandlerService actionHandlerService) {
        this.undoRepository = undoRepository;
        this.redoRepository = redoRepository;
        this.actionHandlerService = actionHandlerService;
    }

    public UndoRedoRepositoryDto undo(String paint_id){
        if (undoRepository.isEmpty(paint_id)) {
            throw new NoMoreUndoAvailableException("No more undo actions available");
        }
        UndoRedoRepositoryDto undoDto = undoRepository.pop(paint_id) ;
        UndoRedoRepositoryDto reversedAction = actionHandlerService.handleAndReverseAction(undoDto,paint_id);
        redoRepository.add(paint_id,reversedAction);

        return undoDto;
    }
    public UndoRedoRepositoryDto redo(String paint_id){
        if (redoRepository.isEmpty(paint_id)) {
            throw new NoMoreRedoAvailableException("No more redo actions available");
        }
        UndoRedoRepositoryDto redoDto = redoRepository.pop(paint_id) ;
        UndoRedoRepositoryDto reversedAction = actionHandlerService.handleAndReverseAction(redoDto,paint_id);
        undoRepository.add(paint_id,reversedAction);

        return redoDto;
    }
}
