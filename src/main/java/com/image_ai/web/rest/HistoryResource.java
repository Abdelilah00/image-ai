package com.image_ai.web.rest;

import com.image_ai.repository.HistoryRepository;
import com.image_ai.service.HistoryService;
import com.image_ai.service.dto.HistoryDTO;
import com.image_ai.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.image_ai.domain.History}.
 */
@RestController
@RequestMapping("/api")
public class HistoryResource {

    private final Logger log = LoggerFactory.getLogger(HistoryResource.class);

    private static final String ENTITY_NAME = "history";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HistoryService historyService;

    private final HistoryRepository historyRepository;

    public HistoryResource(HistoryService historyService, HistoryRepository historyRepository) {
        this.historyService = historyService;
        this.historyRepository = historyRepository;
    }

    /**
     * {@code POST  /histories} : Create a new history.
     *
     * @param historyDTO the historyDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new historyDTO, or with status {@code 400 (Bad Request)} if the history has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/histories")
    public ResponseEntity<HistoryDTO> createHistory(@Valid @RequestBody HistoryDTO historyDTO) throws URISyntaxException {
        log.debug("REST request to save History : {}", historyDTO);
        if (historyDTO.getId() != null) {
            throw new BadRequestAlertException("A new history cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HistoryDTO result = historyService.save(historyDTO);
        return ResponseEntity
            .created(new URI("/api/histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /histories/:id} : Updates an existing history.
     *
     * @param id the id of the historyDTO to save.
     * @param historyDTO the historyDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated historyDTO,
     * or with status {@code 400 (Bad Request)} if the historyDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the historyDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/histories/{id}")
    public ResponseEntity<HistoryDTO> updateHistory(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody HistoryDTO historyDTO
    ) throws URISyntaxException {
        log.debug("REST request to update History : {}, {}", id, historyDTO);
        if (historyDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, historyDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!historyRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        HistoryDTO result = historyService.update(historyDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, historyDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /histories/:id} : Partial updates given fields of an existing history, field will ignore if it is null
     *
     * @param id the id of the historyDTO to save.
     * @param historyDTO the historyDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated historyDTO,
     * or with status {@code 400 (Bad Request)} if the historyDTO is not valid,
     * or with status {@code 404 (Not Found)} if the historyDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the historyDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/histories/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<HistoryDTO> partialUpdateHistory(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody HistoryDTO historyDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update History partially : {}, {}", id, historyDTO);
        if (historyDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, historyDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!historyRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<HistoryDTO> result = historyService.partialUpdate(historyDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, historyDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /histories} : get all the histories.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of histories in body.
     */
    @GetMapping("/histories")
    public List<HistoryDTO> getAllHistories(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Histories");
        return historyService.findAll();
    }

    /**
     * {@code GET  /histories/:id} : get the "id" history.
     *
     * @param id the id of the historyDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the historyDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/histories/{id}")
    public ResponseEntity<HistoryDTO> getHistory(@PathVariable Long id) {
        log.debug("REST request to get History : {}", id);
        Optional<HistoryDTO> historyDTO = historyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(historyDTO);
    }

    /**
     * {@code DELETE  /histories/:id} : delete the "id" history.
     *
     * @param id the id of the historyDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/histories/{id}")
    public ResponseEntity<Void> deleteHistory(@PathVariable Long id) {
        log.debug("REST request to delete History : {}", id);
        historyService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
