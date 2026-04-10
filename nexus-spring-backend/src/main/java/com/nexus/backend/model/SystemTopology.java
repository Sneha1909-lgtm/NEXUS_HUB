package com.nexus.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "SystemTopology")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SystemTopology {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nodeName;
    private String loadPercentage;
    private String status; // Optimal, Load Warning, Offline
}
