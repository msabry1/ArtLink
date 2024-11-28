package com.artlink.model.dto;

import com.artlink.model.shapes.Shape;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UndoRedoDto {
    private  String action ;
    private Shape shape;
}
