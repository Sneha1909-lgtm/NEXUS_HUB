package com.nexus.backend.controller;

import com.nexus.backend.model.*;
import com.nexus.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/lms")
@CrossOrigin(origins = "*")
public class LMSController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

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
        Student student = resolveStudent(studentId);
        if (student == null) return ResponseEntity.notFound().build();

        List<Enrollment> enrollments = enrollmentRepository.findByStudentId(student.getId());
        List<Map<String, Object>> response = new ArrayList<>();
        
        for (Enrollment e : enrollments) {
            Course c = e.getCourse();
            Map<String, Object> map = new HashMap<>();
            map.put("id", c.getId());
            map.put("name", c.getName());
            map.put("instructor", c.getInstructor());
            map.put("image", c.getImage() != null ? c.getImage() : "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80");
            map.put("progress", e.getProgress());
            map.put("status", e.getStatus());
            map.put("lessons", 24); // standard structure mock wrapper for UI
            response.add(map);
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/assignments/{studentId}")
    public ResponseEntity<?> getAssignments(@PathVariable String studentId) {
        Student student = resolveStudent(studentId);
        if (student == null) return ResponseEntity.notFound().build();

        List<Enrollment> enrollments = enrollmentRepository.findByStudentId(student.getId());
        List<Map<String, Object>> response = new ArrayList<>();
        
        List<Assignment> allAssignments = assignmentRepository.findAll();
        for (Enrollment e : enrollments) {
            for (Assignment a : allAssignments) {
                if (a.getCourse().getId().equals(e.getCourse().getId())) {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", a.getId());
                    map.put("title", a.getTitle());
                    map.put("Course", Map.of("name", a.getCourse().getName()));
                    map.put("priority", a.getPriority());
                    map.put("deadline", a.getDeadline().toString());
                    map.put("status", a.getStatus());
                    response.add(map);
                }
            }
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/attendance/{studentId}")
    public ResponseEntity<?> getAttendance(@PathVariable String studentId) {
        Student student = resolveStudent(studentId);
        if (student == null) return ResponseEntity.notFound().build();

        List<Attendance> attendances = attendanceRepository.findByStudentId(student.getId());
        List<Map<String, Object>> response = new ArrayList<>();
        for (Attendance a : attendances) {
             Map<String, Object> map = new HashMap<>();
             map.put("Subject", Map.of("name", a.getSubject().getName()));
             map.put("status", a.getStatus().name());
             map.put("date", a.getDate().toString());
             response.add(map);
        }
        return ResponseEntity.ok(response);
    }
    
    private Student resolveStudent(String identifier) {
        try {
            Long id = Long.parseLong(identifier);
            return studentRepository.findByUserId(id).orElse(studentRepository.findById(id).orElse(null));
        } catch (NumberFormatException e) {
            User user = userRepository.findByUsername(identifier).orElse(null);
            if (user != null) {
                return studentRepository.findByUser(user).orElse(null);
            }
        }
        return null;
    }
}
