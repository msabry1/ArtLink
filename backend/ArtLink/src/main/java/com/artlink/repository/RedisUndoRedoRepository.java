package com.artlink.repository;


import com.artlink.model.dto.UndoRedoRepositoryDto;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;

public class RedisUndoRedoRepository {
    private ListOperations<String, UndoRedoRepositoryDto> listOperations;
    private final String REDIS_OPERATION_KEY ;

    public RedisUndoRedoRepository(RedisTemplate<String, UndoRedoRepositoryDto> redisTemplate, String key) {
        listOperations = redisTemplate.opsForList() ;
        REDIS_OPERATION_KEY = key ;
    }

    public void add(String paint_id, UndoRedoRepositoryDto undoRedoRepositoryDto) {
        listOperations.rightPush(paint_id + REDIS_OPERATION_KEY, undoRedoRepositoryDto) ;
    }

    public Long size(String paint_id){
        return listOperations.size(paint_id + REDIS_OPERATION_KEY) ;
    }

    public UndoRedoRepositoryDto pop(String paint_id) {
        UndoRedoRepositoryDto undoRedoRepositoryDto = listOperations.getLast(paint_id + REDIS_OPERATION_KEY) ;
        listOperations.rightPop(paint_id + REDIS_OPERATION_KEY) ;
        return undoRedoRepositoryDto;
    }
}
