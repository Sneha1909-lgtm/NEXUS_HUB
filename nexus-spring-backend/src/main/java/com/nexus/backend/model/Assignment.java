package com.nexus.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Assignments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private LocalDateTime deadline;

    private String priority; // ENUM as String: Low, Medium, High, Critical
    private String status;   // ENUM as String: ACTIVE, ARCHIVED, DRAFT

    @ManyToOne
    @JoinColumn(name = "courseId")
    private Course course;
}
