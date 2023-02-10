package com.image_ai.service;

import com.image_ai.service.dto.ModelDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.image_ai.domain.Model}.
 */
public interface ModelService {
    /**
     * Save a model.
     *
     * @param modelDTO the entity to save.
     * @return the persisted entity.
     */
    ModelDTO save(ModelDTO modelDTO);

    /**
     * Updates a model.
     *
     * @param modelDTO the entity to update.
     * @return the persisted entity.
     */
    ModelDTO update(ModelDTO modelDTO);

    /**
     * Partially updates a model.
     *
     * @param modelDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ModelDTO> partialUpdate(ModelDTO modelDTO);

    /**
     * Get all the models.
     *
     * @return the list of entities.
     */
    List<ModelDTO> findAll();

    /**
     * Get the "id" model.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ModelDTO> findOne(Long id);

    /**
     * Delete the "id" model.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
