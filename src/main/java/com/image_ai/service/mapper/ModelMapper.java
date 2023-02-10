package com.image_ai.service.mapper;

import com.image_ai.domain.Model;
import com.image_ai.service.dto.ModelDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Model} and its DTO {@link ModelDTO}.
 */
@Mapper(componentModel = "spring")
public interface ModelMapper extends EntityMapper<ModelDTO, Model> {}
