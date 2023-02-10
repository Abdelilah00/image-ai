package com.image_ai.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A History.
 */
@Entity
@Table(name = "history")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class History implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "image_source", nullable = false)
    private String imageSource;

    @Column(name = "image_destination")
    private String imageDestination;

    @Column(name = "duration")
    private Integer duration;

    @ManyToOne(optional = false)
    @NotNull
    private User user;

    @ManyToOne
    private Model model;

    @ManyToOne
    @JsonIgnoreProperties(value = { "histories" }, allowSetters = true)
    private Status status;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public History id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageSource() {
        return this.imageSource;
    }

    public History imageSource(String imageSource) {
        this.setImageSource(imageSource);
        return this;
    }

    public void setImageSource(String imageSource) {
        this.imageSource = imageSource;
    }

    public String getImageDestination() {
        return this.imageDestination;
    }

    public History imageDestination(String imageDestination) {
        this.setImageDestination(imageDestination);
        return this;
    }

    public void setImageDestination(String imageDestination) {
        this.imageDestination = imageDestination;
    }

    public Integer getDuration() {
        return this.duration;
    }

    public History duration(Integer duration) {
        this.setDuration(duration);
        return this;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public History user(User user) {
        this.setUser(user);
        return this;
    }

    public Model getModel() {
        return this.model;
    }

    public void setModel(Model model) {
        this.model = model;
    }

    public History model(Model model) {
        this.setModel(model);
        return this;
    }

    public Status getStatus() {
        return this.status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public History status(Status status) {
        this.setStatus(status);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof History)) {
            return false;
        }
        return id != null && id.equals(((History) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "History{" +
            "id=" + getId() +
            ", imageSource='" + getImageSource() + "'" +
            ", imageDestination='" + getImageDestination() + "'" +
            ", duration=" + getDuration() +
            "}";
    }
}
