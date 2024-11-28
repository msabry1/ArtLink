package com.artlink.model.shapes;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class Polygon extends Shape2d {
    private String radius;
    private String sides;
}
