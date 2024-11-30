package com.artlink.actions;

import com.artlink.model.dto.UndoRedoRepositoryDto;

public interface IActionReverser {
    UndoRedoRepositoryDto reverseAction(UndoRedoRepositoryDto dto, String paint_id);
}
