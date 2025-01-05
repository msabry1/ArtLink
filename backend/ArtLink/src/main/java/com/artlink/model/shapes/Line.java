package com.artlink.model.shapes;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class Line extends Shape {
    List<Integer> points;
}
