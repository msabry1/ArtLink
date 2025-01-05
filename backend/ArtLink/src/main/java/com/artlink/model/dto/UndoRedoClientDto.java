package com.artlink.model.dto;

import lombok.Data;

@Data
public class UndoRedoClientDto {
    private String action;
    private String paintId;
}
