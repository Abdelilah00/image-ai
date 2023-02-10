package com.image_ai.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.image_ai.domain.History} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class HistoryDTO implements Serializable {

    private Long id;

    @NotNull
    private String imageSource;

    private String imageDestination;

    private Integer duration;

    private UserDTO user;

    private ModelDTO model;

    private StatusDTO status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageSource() {
        return imageSource;
    }

    public void setImageSource(String imageSource) {
        this.imageSource = imageSource;
    }

    public String getImageDestination() {
        return imageDestination;
    }

    public void setImageDestination(String imageDestination) {
        this.imageDestination = imageDestination;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public ModelDTO getModel() {
        return model;
    }

    public void setModel(ModelDTO model) {
        this.model = model;
    }

    public StatusDTO getStatus() {
        return status;
    }

    public void setStatus(StatusDTO status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof HistoryDTO)) {
            return false;
        }

        HistoryDTO historyDTO = (HistoryDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, historyDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "HistoryDTO{" +
            "id=" + getId() +
            ", imageSource='" + getImageSource() + "'" +
            ", imageDestination='" + getImageDestination() + "'" +
            ", duration=" + getDuration() +
            ", user=" + getUser() +
            ", model=" + getModel() +
            ", status=" + getStatus() +
            "}";
    }
}
