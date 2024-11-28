package com.artlink.model.shapes;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class Rectangle extends Shape2d {
    private String width;
    private String height;
}
