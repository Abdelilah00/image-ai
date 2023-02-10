package com.image_ai.repository;

import com.image_ai.domain.UserDetails;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the UserDetails entity.
 */
@Repository
public interface UserDetailsRepository extends JpaRepository<UserDetails, Long> {
    default Optional<UserDetails> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<UserDetails> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<UserDetails> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct userDetails from UserDetails userDetails left join fetch userDetails.user",
        countQuery = "select count(distinct userDetails) from UserDetails userDetails"
    )
    Page<UserDetails> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct userDetails from UserDetails userDetails left join fetch userDetails.user")
    List<UserDetails> findAllWithToOneRelationships();

    @Query("select userDetails from UserDetails userDetails left join fetch userDetails.user where userDetails.id =:id")
    Optional<UserDetails> findOneWithToOneRelationships(@Param("id") Long id);
}
