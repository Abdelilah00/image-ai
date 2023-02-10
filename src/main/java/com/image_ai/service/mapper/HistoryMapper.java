package com.image_ai.service.mapper;

import com.image_ai.domain.History;
import com.image_ai.domain.Model;
import com.image_ai.domain.Status;
import com.image_ai.domain.User;
import com.image_ai.service.dto.HistoryDTO;
import com.image_ai.service.dto.ModelDTO;
import com.image_ai.service.dto.StatusDTO;
import com.image_ai.service.dto.UserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link History} and its DTO {@link HistoryDTO}.
 */
@Mapper(componentModel = "spring")
public interface HistoryMapper extends EntityMapper<HistoryDTO, History> {
    @Mapping(target = "user", source = "user", qualifiedByName = "userLogin")
    @Mapping(target = "model", source = "model", qualifiedByName = "modelId")
    @Mapping(target = "status", source = "status", qualifiedByName = "statusId")
    HistoryDTO toDto(History s);

    @Named("userLogin")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    UserDTO toDtoUserLogin(User user);

    @Named("modelId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ModelDTO toDtoModelId(Model model);

    @Named("statusId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    StatusDTO toDtoStatusId(Status status);
}
