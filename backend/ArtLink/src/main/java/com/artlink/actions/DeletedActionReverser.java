package com.artlink.actions;

import com.artlink.enums.ActionType;
import com.artlink.model.dto.UndoRedoRepositoryDto;
import com.artlink.repository.IShapeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeletedActionReverser implements IActionReverser {
    private final IShapeRepository shapeRepository;

    @Autowired
    public DeletedActionReverser(IShapeRepository shapeRepository) {
        this.shapeRepository = shapeRepository;
    }

    @Override
    public UndoRedoRepositoryDto reverseAction(UndoRedoRepositoryDto undoRedoRepositoryDto, String paint_id) {
        shapeRepository.deleteShape(paint_id, undoRedoRepositoryDto.getShape());
        return UndoRedoRepositoryDto.builder()
                .action(ActionType.ADD)
                .shape(undoRedoRepositoryDto.getShape())
                .build();
    }
}
