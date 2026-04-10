package com.nexus.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Courses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String instructor;
    private String category;
    private String complexity; // Using String for simplicity, can be Enum
    private String image;
    private Float rating;
    private Integer studentsCount;

    @Column(columnDefinition = "TEXT")
    private String description;
}
