package com.artlink.repository;


import com.artlink.model.dto.UndoRedoDto;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;

public class RedisUndoRedoRepository {
    private ListOperations<String, UndoRedoDto> listOperations;
    private final String REDIS_OPERATION_KEY ;

    public RedisUndoRedoRepository(RedisTemplate<String, UndoRedoDto> redisTemplate,String key) {
        listOperations = redisTemplate.opsForList() ;
        REDIS_OPERATION_KEY = key ;
    }

    public void add(String paint_id,UndoRedoDto undoRedoDto) {
        listOperations.rightPush(paint_id + REDIS_OPERATION_KEY,undoRedoDto) ;
    }

    public Long size(String paint_id){
        return listOperations.size(paint_id + REDIS_OPERATION_KEY) ;
    }

    public UndoRedoDto pop(String paint_id) {
        UndoRedoDto undoRedoDto = listOperations.getLast(paint_id + REDIS_OPERATION_KEY) ;
        listOperations.rightPop(paint_id + REDIS_OPERATION_KEY) ;
        return undoRedoDto ;
    }
}
