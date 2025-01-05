package com.artlink.redis;


import com.artlink.model.shapes.Shape;
import com.artlink.repository.IShapeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RedisShapesRepository implements IShapeRepository {
    private final HashOperations<String, String, Shape> hashOperations;

    @Autowired
    public RedisShapesRepository(RedisTemplate<String, Shape> redisTemplate) {
        this.hashOperations = redisTemplate.opsForHash();
    }

    @Override
    public void saveShape(String paintId, Shape shape) {
        hashOperations.put(paintId, shape.getId(), shape);
    }

    @Override
    public Shape findShape(String paintId, String shapeId) {
        return hashOperations.get(paintId, shapeId);
    }

    @Override
    public List<Shape> findAllShapes(String paintId) {
        return hashOperations.values(paintId);
    }

    @Override
    public void deleteShape(String paintId, Shape shape) {
        hashOperations.delete(paintId, shape.getId());
    }
}

