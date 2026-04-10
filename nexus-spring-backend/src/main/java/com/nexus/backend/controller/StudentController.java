package com.nexus.backend.controller;

import com.nexus.backend.model.*;
import com.nexus.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {


    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private MarkRepository markRepository;

    @GetMapping("/{id}/attendance")
    public ResponseEntity<List<Attendance>> getAttendance(@PathVariable long id) {
        return ResponseEntity.ok(attendanceRepository.findByStudentId(id));
    }

    @GetMapping("/{id}/marks")
    public ResponseEntity<List<Mark>> getMarks(@PathVariable long id) {
        return ResponseEntity.ok(markRepository.findByStudentId(id));
    }
}
