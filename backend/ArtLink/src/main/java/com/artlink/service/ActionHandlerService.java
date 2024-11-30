package com.artlink.service;

import com.artlink.model.dto.UndoRedoRepositoryDto;
import com.artlink.actions.ActionReverserFactory;
import com.artlink.actions.IActionReverser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActionHandlerService {
    final private  ActionReverserFactory actionReverserFactory;

    @Autowired
    public ActionHandlerService(ActionReverserFactory actionReverserFactory) {
        this.actionReverserFactory = actionReverserFactory;
    }

    public UndoRedoRepositoryDto handleAndReverseAction(UndoRedoRepositoryDto undoRedoRepositoryDto, String paintId) {
        IActionReverser iActionReverser = actionReverserFactory.
                createActionReverser(undoRedoRepositoryDto.getAction());
        return iActionReverser.reverseAction(undoRedoRepositoryDto, paintId);
    }
}
