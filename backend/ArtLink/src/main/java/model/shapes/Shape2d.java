package model.shapes;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public abstract class Shape2d extends Shape {
    private String x;
    private String y;
}
