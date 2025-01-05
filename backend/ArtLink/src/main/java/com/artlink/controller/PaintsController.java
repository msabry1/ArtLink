package com.artlink.controller;

import com.artlink.model.shapes.Shape;
import com.artlink.repository.RedisShapesRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PaintsController {

    RedisShapesRepository redisShapesRepository;

    public PaintsController(RedisShapesRepository redisShapesRepository) {
        this.redisShapesRepository = redisShapesRepository;
    }

    @GetMapping("app/shapes/{paintid}")
    public List<Shape> getShapes(@PathVariable String paintid) {
        return redisShapesRepository.findAllShapes(paintid);
    }

}
