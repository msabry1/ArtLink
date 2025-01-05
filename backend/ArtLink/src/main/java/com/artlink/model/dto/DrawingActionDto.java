package com.artlink.model.dto;


import lombok.Builder;
import lombok.Data;
import com.artlink.model.shapes.Shape;

@Data
@Builder
public class DrawingActionDto {
    private String action;
    private String type;
    private String paintId;
    private Shape shape;
}
