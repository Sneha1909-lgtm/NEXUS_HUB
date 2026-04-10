package com.nexus.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Faculties")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Faculty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String department;
    private Double feedbackScore;
    private Integer authoredModules;
    private Integer researchCitations;
    private String industrySyncPct;

    @OneToOne
    @JoinColumn(name = "userId")
    private User user;
}
