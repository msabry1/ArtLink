package com.artlink.service;

import com.artlink.model.dto.DrawingActionDto;
import com.artlink.model.dto.UndoRedoClientDto;
import com.fasterxml.jackson.core.JsonProcessingException;

public interface WebSocketService {

    public DrawingActionDto processDrawingAction(String jsonMessage) throws JsonProcessingException;
    public DrawingActionDto processUndoRedoAction(UndoRedoClientDto undoRedoclientDto);
}
