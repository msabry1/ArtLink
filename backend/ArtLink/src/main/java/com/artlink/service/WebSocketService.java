package com.artlink.service;

import com.artlink.model.dto.DrawingActionDto;
import com.artlink.model.dto.UndoRedoClientDto;
import com.fasterxml.jackson.core.JsonProcessingException;

public interface WebSocketService {

    DrawingActionDto processDrawingAction(String jsonMessage) throws JsonProcessingException;
    DrawingActionDto processUndoRedoAction(UndoRedoClientDto undoRedoclientDto);
}
