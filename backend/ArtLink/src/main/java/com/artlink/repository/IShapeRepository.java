package com.artlink.repository;

import com.artlink.model.shapes.Shape;

import java.util.List;

public interface IShapeRepository {
    void saveShape(String paintId, Shape shape);

    Shape findShape(String paintId, String shapeId);

    List<Shape> findAllShapes(String paintId);

    void deleteShape(String paintId, Shape shape);
}
