package com.nexus.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Students")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String branch;

    @OneToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "courseId")
    private Course course;

    // Additional fields mapped from frontend requirements
    private Double cgpa;
    private Double feeDue;
    private Integer attendancePercentage;
    private Integer completionPercentage;
    private Integer activeCoursesCount;
}
