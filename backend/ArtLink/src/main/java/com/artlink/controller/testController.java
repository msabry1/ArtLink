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

    public testController(WebSocketService webSocketService) {
        this.webSocketService = webSocketService;
    }

    @RequestMapping("app/draw")
    public DrawingActionDto share(@RequestBody String jsonMessage) throws JsonProcessingException {
        return webSocketService.processDrawingAction(jsonMessage);
    }
    @RequestMapping("app/undo.redo")
    public DrawingActionDto getDrawingActionDto(@RequestBody UndoRedoClientDto undoRedoClientDto) {
        return webSocketService.processUndoRedoAction(undoRedoClientDto);
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
