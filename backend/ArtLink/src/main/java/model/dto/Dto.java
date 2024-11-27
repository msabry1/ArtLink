package model.dto;

import com.example.demo.model.shapes.Shape;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Dto {
    private String action;
    private String type;
    private String paintId;
    private Shape shape;
}
