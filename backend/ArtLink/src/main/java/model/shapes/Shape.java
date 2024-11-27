package model.shapes;

import lombok.Data;
@Data
public abstract class Shape {
    private String id;
    private String fill;
    private String stroke;
}
