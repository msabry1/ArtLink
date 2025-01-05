package com.artlink.service;

import com.artlink.model.dto.DrawingActionDto;
import com.artlink.model.dto.UndoRedoClientDto;
import com.artlink.model.dto.UndoRedoRepositoryDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.stereotype.Service;

@Service
public class DtoProcessService implements WebSocketService {

    UndoRedoService undoRedoService;
    DrawingActionService drawingActionService;
    ShapesMappingService shapesMappingService;

    public DtoProcessService(UndoRedoService undoRedoService,
                             ShapesMappingService shapesMappingService,
                             DrawingActionService drawingActionService) {
        this.undoRedoService = undoRedoService;
        this.shapesMappingService = shapesMappingService ;
        this.drawingActionService = drawingActionService;
    }

    @Override
    public DrawingActionDto processDrawingAction(String jsonMessage) throws JsonProcessingException {
        DrawingActionDto drawingActionDto = shapesMappingService.handleJsonMapping(jsonMessage);
        drawingActionService.execute(
                                        drawingActionDto.getPaintId(),
                                        drawingDtoToUndoRedoDto(drawingActionDto)
        );
        return drawingActionDto;
    }


    @Override
    public DrawingActionDto processUndoRedoAction(UndoRedoClientDto undoRedoclientDto) {
        UndoRedoRepositoryDto dto ;
        if( undoRedoclientDto.getAction().equals("undo")){
            dto = undoRedoService.undo(undoRedoclientDto.getPaintId());
        } else if( undoRedoclientDto.getAction().equals("redo")) {
            dto = undoRedoService.redo(undoRedoclientDto.getPaintId());
        } else {
            throw new IllegalArgumentException(undoRedoclientDto.getAction() + " is not supported");
        }
        return UndoRedoDtoTodrawingDto(dto, undoRedoclientDto.getPaintId());
    }



    public UndoRedoRepositoryDto drawingDtoToUndoRedoDto(DrawingActionDto drawingActionDto) {
        return UndoRedoRepositoryDto.builder()
                .action(drawingActionDto.getAction())
                .shape(drawingActionDto.getShape())
                .build();
    }

    public DrawingActionDto UndoRedoDtoTodrawingDto(UndoRedoRepositoryDto undoRedoDto, String paintId) {
        return DrawingActionDto.builder()
                .action(undoRedoDto.getAction())
                .type(undoRedoDto.getShape().getClass().getSimpleName().toLowerCase())
                .paintId(paintId)
                .shape(undoRedoDto.getShape())
                .build();
    }

}
