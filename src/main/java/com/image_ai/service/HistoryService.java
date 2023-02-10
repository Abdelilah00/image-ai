package com.image_ai.service;

import com.image_ai.service.dto.HistoryDTO;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.image_ai.domain.History}.
 */
public interface HistoryService {
    /**
     * Save a history.
     *
     * @param historyDTO the entity to save.
     * @return the persisted entity.
     */
    HistoryDTO save(HistoryDTO historyDTO);

    /**
     * Updates a history.
     *
     * @param historyDTO the entity to update.
     * @return the persisted entity.
     */
    HistoryDTO update(HistoryDTO historyDTO);

    /**
     * Partially updates a history.
     *
     * @param historyDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<HistoryDTO> partialUpdate(HistoryDTO historyDTO);

    /**
     * Get all the histories.
     *
     * @return the list of entities.
     */
    List<HistoryDTO> findAll();

    /**
     * Get all the histories with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<HistoryDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" history.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<HistoryDTO> findOne(Long id);

    /**
     * Delete the "id" history.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
