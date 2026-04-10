package com.nexus.backend.repository;

import com.nexus.backend.model.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacultyRepository extends JpaRepository<Faculty, Long> {
    java.util.Optional<Faculty> findByUser(com.nexus.backend.model.User user);
}
