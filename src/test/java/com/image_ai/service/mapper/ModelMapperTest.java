package com.image_ai.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ModelMapperTest {

    private ModelMapper modelMapper;

    @BeforeEach
    public void setUp() {
        modelMapper = new ModelMapperImpl();
    }
}
