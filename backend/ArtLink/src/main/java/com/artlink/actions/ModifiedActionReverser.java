package com.artlink.actions;

import com.artlink.enums.ActionType;
import com.artlink.model.dto.UndoRedoRepositoryDto;
import com.artlink.model.shapes.Shape;
import com.artlink.repository.IShapeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ModifiedActionReverser implements IActionReverser {
    private final IShapeRepository shapeRepository;

    @Autowired
    public ModifiedActionReverser(IShapeRepository shapeRepository) {
        this.shapeRepository = shapeRepository;
    }

    @Override
    public UndoRedoRepositoryDto reverseAction(UndoRedoRepositoryDto undoRedoRepositoryDto, String paint_id) {
        Shape cachedShape = shapeRepository.findShape(
                paint_id,
                undoRedoRepositoryDto.getShape().getId()
        );
        shapeRepository.saveShape(paint_id, undoRedoRepositoryDto.getShape());
        return UndoRedoRepositoryDto.builder()
                .action(ActionType.MODIFY)
                .shape(cachedShape)
                .build();
    }
}