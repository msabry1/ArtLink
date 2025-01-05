package com.artlink.actions;

import com.artlink.enums.ActionType;
import com.artlink.model.dto.UndoRedoRepositoryDto;
import com.artlink.repository.IShapeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddedActionReverser implements IActionReverser {
    private final IShapeRepository shapeRepository;

    @Autowired
    public AddedActionReverser(IShapeRepository shapeRepository) {
        this.shapeRepository = shapeRepository;
    }

    @Override
    public UndoRedoRepositoryDto reverseAction(UndoRedoRepositoryDto undoRedoRepositoryDto, String paint_id) {
        shapeRepository.saveShape(paint_id, undoRedoRepositoryDto.getShape());
        return UndoRedoRepositoryDto.builder()
                .action(ActionType.DELETE)
                .shape(undoRedoRepositoryDto.getShape())
                .build();
    }
}