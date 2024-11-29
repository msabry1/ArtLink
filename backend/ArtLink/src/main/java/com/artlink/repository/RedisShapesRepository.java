package com.artlink.repository;


import com.artlink.model.shapes.Shape;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class RedisShapesRepository {
    private final HashOperations<String, String, Shape> hashOperations;

    @Autowired
    public RedisShapesRepository(RedisTemplate<String, Shape> redisTemplate) {
        this.hashOperations = redisTemplate.opsForHash();
    }

    public void saveShape(String paintId,Shape shape) {
        hashOperations.put(paintId, shape.getId(), shape);
    }

    public Shape findShape(String paintId, String shapeId) {
        return hashOperations.get(paintId, shapeId);
    }

    public List<Shape> findAllShapes(String paintId) {
        return hashOperations.values(paintId);
    }

    public void deleteShape(String paintId, Shape shape) {
        hashOperations.delete(paintId, shape.getId());
    }
}

