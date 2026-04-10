package com.nexus.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {


    @GetMapping("/student")
    public ResponseEntity<?> getStudentDashboard() {
        // Mocking for demo as per Node.js logic
        Map<String, Object> response = new HashMap<>();
        response.put("attendancePercentage", 88);
        response.put("coursesEnrolled", 6);
        response.put("completionPercentage", 65);
        response.put("cgpa", 8.42);
        response.put("feeDue", 45000);
        
        List<Map<String, Object>> mastery = new ArrayList<>();
        mastery.add(Map.of("name", "Advanced React Architecture", "progress", 65));
        mastery.add(Map.of("name", "Cloud Infrastructure with AWS", "progress", 90));
        response.put("mastery", mastery);

        Map<String, Object> erp = new HashMap<>();
        List<Map<String, Object>> attendanceSummary = new ArrayList<>();
        attendanceSummary.add(Map.of("subject", "Data Structures", "percentage", 85));
        attendanceSummary.add(Map.of("subject", "Web Technologies", "percentage", 92));
        attendanceSummary.add(Map.of("subject", "Computer Networks", "percentage", 78));
        erp.put("attendanceSummary", attendanceSummary);

        List<Map<String, Object>> recentResults = new ArrayList<>();
        recentResults.add(Map.of("subject", "Data Structures", "grade", "A", "marks", 85));
        recentResults.add(Map.of("subject", "Web Technologies", "grade", "A+", "marks", 92));
        erp.put("recentResults", recentResults);

        List<Map<String, Object>> erpTimetable = new ArrayList<>();
        erpTimetable.add(Map.of("time", "09:00 AM", "subject", "Data Structures", "room", "Room 401"));
        erpTimetable.add(Map.of("time", "11:30 AM", "subject", "Web Technologies", "room", "Lab 2"));
        erp.put("timetable", erpTimetable);
        response.put("erp", erp);

        List<Map<String, Object>> notifications = new ArrayList<>();
        notifications.add(Map.of("id", "1", "type", "ALARM", "text", "Fee payment due tomorrow"));
        notifications.add(Map.of("id", "2", "type", "INFO", "text", "Web assignment posted"));
        response.put("notifications", notifications);

        Map<String, Object> lms = new HashMap<>();
        List<Map<String, Object>> courses = new ArrayList<>();
        courses.add(Map.of("name", "React Basics", "progress", 60, "color", "#4f46e5"));
        courses.add(Map.of("name", "Advanced CSS", "progress", 85, "color", "#10b981"));
        lms.put("courses", courses);

        List<Map<String, Object>> pendingAssignments = new ArrayList<>();
        pendingAssignments.add(Map.of("priority", "High", "due", "Tomorrow", "title", "Make Dashboard component"));
        pendingAssignments.add(Map.of("priority", "Medium", "due", "Next Week", "title", "Fix auth endpoint bugs"));
        lms.put("pendingAssignments", pendingAssignments);
        response.put("lms", lms);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/faculty")
    public ResponseEntity<?> getFacultyDashboard() {
        Map<String, Object> response = new HashMap<>();
        response.put("totalStudents", 156);
        response.put("activeCourses", 4);
        response.put("averageAttendance", 82);
        response.put("pendingGrades", 24);

        List<Map<String, Object>> timetable = new ArrayList<>();
        timetable.add(Map.of("time", "09:00 AM", "subject", "Data Structures", "room", "Room 401"));
        timetable.add(Map.of("time", "11:30 AM", "subject", "Operating Systems", "room", "Lab 2"));
        response.put("timetable", timetable);

        List<Map<String, Object>> upcomingTasks = new ArrayList<>();
        upcomingTasks.add(Map.of("priority", "High", "due", "Today", "title", "Submit Mid-term Grades"));
        upcomingTasks.add(Map.of("priority", "Normal", "due", "Tomorrow", "title", "Review Project Proposals"));
        response.put("upcomingTasks", upcomingTasks);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/admin")
    public ResponseEntity<?> getAdminDashboard() {
        Map<String, Object> response = new HashMap<>();
        response.put("totalUsers", 2450);
        response.put("systemUptime", "99.9%");
        response.put("activeLogins", 420);
        response.put("pendingRequests", 15);

        List<Map<String, Object>> systemIntegrity = new ArrayList<>();
        systemIntegrity.add(Map.of("node", "Core DB", "status", "Optimal", "load", "45%"));
        systemIntegrity.add(Map.of("node", "Auth Service", "status", "Optimal", "load", "20%"));
        systemIntegrity.add(Map.of("node", "Storage Array", "status", "Warning", "load", "85%"));
        response.put("systemIntegrity", systemIntegrity);

        List<Map<String, Object>> recentLogs = new ArrayList<>();
        recentLogs.add(Map.of("event", "Failed login attempt: root", "time", "2m ago"));
        recentLogs.add(Map.of("event", "DB Backup Completed", "time", "1h ago"));
        recentLogs.add(Map.of("event", "System updated to v2.4", "time", "1d ago"));
        response.put("recentLogs", recentLogs);

        return ResponseEntity.ok(response);
    }
}
