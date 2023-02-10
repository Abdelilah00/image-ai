package com.image_ai.service.mapper;

import com.image_ai.domain.User;
import com.image_ai.domain.UserDetails;
import com.image_ai.service.dto.UserDTO;
import com.image_ai.service.dto.UserDetailsDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link UserDetails} and its DTO {@link UserDetailsDTO}.
 */
@Mapper(componentModel = "spring")
public interface UserDetailsMapper extends EntityMapper<UserDetailsDTO, UserDetails> {
    @Mapping(target = "user", source = "user", qualifiedByName = "userLogin")
    UserDetailsDTO toDto(UserDetails s);

    @Named("userLogin")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    UserDTO toDtoUserLogin(User user);
}
