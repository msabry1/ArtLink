package model.shapes;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class Elipse extends Shape2d {
    private ElipseRadius radius;
}
