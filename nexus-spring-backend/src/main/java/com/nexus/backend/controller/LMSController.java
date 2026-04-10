package com.nexus.backend.controller;

import com.nexus.backend.model.*;
import com.nexus.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/lms")
@CrossOrigin(origins = "*")
public class LMSController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @GetMapping("/courses")
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(courseRepository.findAll());
    }

    @GetMapping("/student/{studentId}/enrollments")
    public ResponseEntity<List<Enrollment>> getStudentEnrollments(@PathVariable Long studentId) {
        return ResponseEntity.ok(enrollmentRepository.findByStudentId(studentId));
    }

    @GetMapping("/my-courses/{studentId}")
    public ResponseEntity<?> getMyCourses(@PathVariable String studentId) {
        List<java.util.Map<String, Object>> courses = java.util.Arrays.asList(
            java.util.Map.of("id", 1, "name", "Advanced React Architecture", "instructor", "Dr. Sarah Smith", "image", "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80", "progress", 65, "status", "In Sync", "lessons", 24),
            java.util.Map.of("id", 2, "name", "Cloud Infrastructure with AWS", "instructor", "Prof. James Cooper", "image", "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80", "progress", 90, "status", "Optimal", "lessons", 30),
            java.util.Map.of("id", 3, "name", "Database Management Systems", "instructor", "Dr. Alan Turing", "image", "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80", "progress", 45, "status", "Warning", "lessons", 18)
        );
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/assignments/{studentId}")
    public ResponseEntity<?> getAssignments(@PathVariable String studentId) {
        List<java.util.Map<String, Object>> assignments = java.util.Arrays.asList(
            java.util.Map.of("id", 1, "title", "React state management", "Course", java.util.Map.of("name", "Advanced React Architecture"), "priority", "High", "deadline", "2024-05-15T23:59:00", "status", "PENDING"),
            java.util.Map.of("id", 2, "title", "AWS deployment setup", "Course", java.util.Map.of("name", "Cloud Infrastructure with AWS"), "priority", "Medium", "deadline", "2024-05-20T23:59:00", "status", "SUBMITTED"),
            java.util.Map.of("id", 3, "title", "SQL Normalization", "Course", java.util.Map.of("name", "Database Management Systems"), "priority", "High", "deadline", "2024-05-25T23:59:00", "status", "PENDING")
        );
        return ResponseEntity.ok(assignments);
    }

    @GetMapping("/attendance/{studentId}")
    public ResponseEntity<?> getAttendance(@PathVariable String studentId) {
        List<java.util.Map<String, Object>> attendance = java.util.Arrays.asList(
            java.util.Map.of("Subject", java.util.Map.of("name", "Advanced React Architecture"), "status", "PRESENT"),
            java.util.Map.of("Subject", java.util.Map.of("name", "Advanced React Architecture"), "status", "PRESENT"),
            java.util.Map.of("Subject", java.util.Map.of("name", "Advanced React Architecture"), "status", "ABSENT"),
            java.util.Map.of("Subject", java.util.Map.of("name", "Cloud Infrastructure with AWS"), "status", "PRESENT"),
            java.util.Map.of("Subject", java.util.Map.of("name", "Cloud Infrastructure with AWS"), "status", "PRESENT"),
            java.util.Map.of("Subject", java.util.Map.of("name", "Cloud Infrastructure with AWS"), "status", "PRESENT"),
            java.util.Map.of("Subject", java.util.Map.of("name", "Database Management Systems"), "status", "ABSENT"),
            java.util.Map.of("Subject", java.util.Map.of("name", "Database Management Systems"), "status", "PRESENT")
        );
        return ResponseEntity.ok(attendance);
    }
}
