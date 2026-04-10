package com.nexus.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "TimeSlots")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TimeSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String timeFrame; // e.g., "09:00 - 10:00"
    private String title;
    private String location;
    private Boolean active;

    @ManyToOne
    @JoinColumn(name = "facultyId")
    private Faculty faculty;

    @ManyToOne
    @JoinColumn(name = "studentId")
    private Student student;
}
