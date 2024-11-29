package com.artlink.repository;

import com.artlink.model.dto.UndoRedoRepositoryDto;

public interface IUndoRedoCacheRepository {
    void add(String paintId, UndoRedoRepositoryDto dto);
    UndoRedoRepositoryDto pop(String paintId);
    boolean isEmpty(String paintId);
}
