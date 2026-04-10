package com.nexus.backend.repository;

import com.nexus.backend.model.SystemTopology;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SystemTopologyRepository extends JpaRepository<SystemTopology, Long> {
}
