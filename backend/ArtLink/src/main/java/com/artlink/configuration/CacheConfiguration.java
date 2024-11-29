package com.artlink.configuration;

import com.artlink.model.dto.UndoRedoRepositoryDto;
import com.artlink.redis.RedisUndoRedoRepository;
import com.artlink.repository.IUndoRedoCacheRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;

@Configuration
public class CacheConfiguration {

    @Bean("undo_Repository")
    public IUndoRedoCacheRepository redisUndoRepository(
            RedisTemplate<String, UndoRedoRepositoryDto> redisTemplate
    ) {
        return new RedisUndoRedoRepository(redisTemplate,"_UNDO");
    }

    @Bean("redo_Repository")
    public IUndoRedoCacheRepository redisRedoRepository(
            RedisTemplate<String, UndoRedoRepositoryDto> redisTemplate
    ) {
        return new RedisUndoRedoRepository(redisTemplate,"_REDO");
    }
}
