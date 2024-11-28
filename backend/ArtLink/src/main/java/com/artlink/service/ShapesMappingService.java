package com.artlink.service;


import com.artlink.model.dto.Dto;
import com.artlink.model.shapes.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class ShapesMappingService {

    public final ObjectMapper objectMapper = new ObjectMapper();

    public Dto handleJsonMapping(String jsonMessage) throws JsonProcessingException {
        Map<String, Object> map = objectMapper.readValue(jsonMessage, new TypeReference<Map<String, Object>>() {});
        return Dto.builder()
                .paintId((String) map.get("paintId"))
                .action((String) map.get("action"))
                .type((String) map.get("type"))
                .shape( handleObjectMapping(map.get("shape"),(String) map.get("type")) )
                .build();
    }

    public Shape handleObjectMapping(Object obj, String type) {
        Map<String, Object> shape = (Map<String, Object>) obj;
        if( type.equals("rectangle") ) {
            return objectMapper.convertValue(shape, Rectangle.class);
        } else if( type.equals("elipse") ) {
            return objectMapper.convertValue(shape, Elipse.class);
        } else if( type.equals("circle") ) {
            return objectMapper.convertValue(shape, Circle.class);
        } else if (type.equals("line") ) {
            return objectMapper.convertValue(shape, Line.class);
        } else if (type.equals("polygon") ) {
            return objectMapper.convertValue(shape, Polygon.class);
        } else if( type.equals("text") ){
            return objectMapper.convertValue(shape, Text.class);
        } else {
            throw new IllegalArgumentException("Unsupported type: " + type);
        }
    }
}
