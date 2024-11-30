package com.artlink.service;

import com.artlink.model.dto.UndoRedoRepositoryDto;
import com.artlink.repository.IUndoRedoCacheRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class DrawingActionService {
    private final IUndoRedoCacheRepository undoRepository;
    private final ActionHandlerService actionHandlerService;

    @Autowired
    public DrawingActionService(@Qualifier("undo_Repository") IUndoRedoCacheRepository undoRepository,
                                ActionHandlerService actionHandlerService) {
        this.undoRepository = undoRepository;
        this.actionHandlerService = actionHandlerService;
    }

    public void execute(String paint_id, UndoRedoRepositoryDto undoRedoRepositoryDto){
        UndoRedoRepositoryDto reversedAction = actionHandlerService.handleAndReverseAction(undoRedoRepositoryDto,paint_id);
        undoRepository.add(paint_id,reversedAction);
    }
}
