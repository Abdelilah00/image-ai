package com.image_ai.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class UserDetailsMapperTest {

    private UserDetailsMapper userDetailsMapper;

    @BeforeEach
    public void setUp() {
        userDetailsMapper = new UserDetailsMapperImpl();
    }
}
