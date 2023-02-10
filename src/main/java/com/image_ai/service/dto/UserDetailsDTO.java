package com.image_ai.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.image_ai.domain.UserDetails} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class UserDetailsDTO implements Serializable {

    private Long id;

    @NotNull
    @Min(value = 0)
    private Integer balance;

    private UserDTO user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getBalance() {
        return balance;
    }

    public void setBalance(Integer balance) {
        this.balance = balance;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserDetailsDTO)) {
            return false;
        }

        UserDetailsDTO userDetailsDTO = (UserDetailsDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, userDetailsDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserDetailsDTO{" +
            "id=" + getId() +
            ", balance=" + getBalance() +
            ", user=" + getUser() +
            "}";
    }
}
