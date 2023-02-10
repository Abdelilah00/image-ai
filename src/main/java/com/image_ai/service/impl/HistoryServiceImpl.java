package com.image_ai.service.impl;

import com.image_ai.domain.History;
import com.image_ai.repository.HistoryRepository;
import com.image_ai.service.HistoryService;
import com.image_ai.service.dto.HistoryDTO;
import com.image_ai.service.mapper.HistoryMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link History}.
 */
@Service
@Transactional
public class HistoryServiceImpl implements HistoryService {

    private final Logger log = LoggerFactory.getLogger(HistoryServiceImpl.class);

    private final HistoryRepository historyRepository;

    private final HistoryMapper historyMapper;

    public HistoryServiceImpl(HistoryRepository historyRepository, HistoryMapper historyMapper) {
        this.historyRepository = historyRepository;
        this.historyMapper = historyMapper;
    }

    @Override
    public HistoryDTO save(HistoryDTO historyDTO) {
        log.debug("Request to save History : {}", historyDTO);
        History history = historyMapper.toEntity(historyDTO);
        history = historyRepository.save(history);
        return historyMapper.toDto(history);
    }

    @Override
    public HistoryDTO update(HistoryDTO historyDTO) {
        log.debug("Request to update History : {}", historyDTO);
        History history = historyMapper.toEntity(historyDTO);
        history = historyRepository.save(history);
        return historyMapper.toDto(history);
    }

    @Override
    public Optional<HistoryDTO> partialUpdate(HistoryDTO historyDTO) {
        log.debug("Request to partially update History : {}", historyDTO);

        return historyRepository
            .findById(historyDTO.getId())
            .map(existingHistory -> {
                historyMapper.partialUpdate(existingHistory, historyDTO);

                return existingHistory;
            })
            .map(historyRepository::save)
            .map(historyMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<HistoryDTO> findAll() {
        log.debug("Request to get all Histories");
        return historyRepository.findAll().stream().map(historyMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    public Page<HistoryDTO> findAllWithEagerRelationships(Pageable pageable) {
        return historyRepository.findAllWithEagerRelationships(pageable).map(historyMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<HistoryDTO> findOne(Long id) {
        log.debug("Request to get History : {}", id);
        return historyRepository.findOneWithEagerRelationships(id).map(historyMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete History : {}", id);
        historyRepository.deleteById(id);
    }
}
