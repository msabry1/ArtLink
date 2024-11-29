package com.artlink.controller;


import com.artlink.model.dto.DrawingActionDto;
import com.artlink.model.dto.UndoRedoClientDto;
import com.artlink.service.WebSocketService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class testController {

    WebSocketService webSocketService;
    SimpMessagingTemplate messagingTemplate;

    public testController(WebSocketService webSocketService, SimpMessagingTemplate messagingTemplate) {
        this.webSocketService = webSocketService;
        this.messagingTemplate = messagingTemplate;
    }

    @RequestMapping("app/draw")
    public DrawingActionDto share(@RequestBody String jsonMessage) throws JsonProcessingException {
        DrawingActionDto drawingActionDto = webSocketService.processDrawingAction(jsonMessage);
        return drawingActionDto;
    }
    @RequestMapping("app/undo.redo")
    public DrawingActionDto getDrawingActionDto(@RequestBody UndoRedoClientDto undoRedoClientDto) {
        DrawingActionDto drawingActionDto = webSocketService.processUndoRedoAction(undoRedoClientDto);
        return drawingActionDto;
    }
}

/*
{
    "paintId" : "123",
    "action" : "added",
    "type" : "ellipse",
    "shape" : {
        "id" : "3",
        "fill" : "red",
        "x" : "1",
        "y" : "1",
        "stroke":"213",
        "strokeWidth":"536",
        "radius" : {
            "x" : "3" ,
            "y" : "4"
        }
    }
}
 */
