package com.nexus.backend.seeder;

import com.nexus.backend.model.Role;
import com.nexus.backend.model.User;
import com.nexus.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@SuppressWarnings("null")
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Re-hash passwords for all users using Spring's BCryptPasswordEncoder
        reseedUser("admin", "admin123", Role.ADMIN);
        reseedUser("faculty1", "password123", Role.FACULTY);
        reseedUser("faculty2", "password123", Role.FACULTY);
        reseedUser("student1", "password123", Role.STUDENT);
        reseedUser("student2", "password123", Role.STUDENT);
        reseedUser("student3", "password123", Role.STUDENT);
        
        seedGlobalData();
        System.out.println("[DataSeeder] All user passwords re-synchronized with Spring BCrypt.");
    }

    @Autowired
    private com.nexus.backend.repository.AuditLogRepository auditLogRepository;

    @Autowired
    private com.nexus.backend.repository.SystemTopologyRepository topologyRepository;

    @Autowired
    private com.nexus.backend.repository.NotificationRepository notificationRepository;

    @Autowired
    private com.nexus.backend.repository.TimeSlotRepository timeSlotRepository;

    @Autowired
    private com.nexus.backend.repository.StudentRepository studentRepository;

    @Autowired
    private com.nexus.backend.repository.FacultyRepository facultyRepository;

    @Autowired
    private com.nexus.backend.repository.CourseRepository courseRepository;

    @Autowired
    private com.nexus.backend.repository.SubjectRepository subjectRepository;

    @Autowired
    private com.nexus.backend.repository.AssignmentRepository assignmentRepository;

    @Autowired
    private com.nexus.backend.repository.EnrollmentRepository enrollmentRepository;

    @Autowired
    private com.nexus.backend.repository.AttendanceRepository attendanceRepository;

    @Autowired
    private com.nexus.backend.repository.MarkRepository markRepository;

    private void reseedUser(String username, String rawPassword, Role role) {
        User user = userRepository.findByUsername(username).orElseGet(() -> {
            User newUser = User.builder()
                    .username(username)
                    .role(role)
                    .build();
            System.out.println("[DataSeeder] Creating user: " + username);
            return newUser;
        });

        // Ensure name and email are populated for existing users too
        if (user.getName() == null) {
            user.setName(username.substring(0, 1).toUpperCase() + username.substring(1));
        }
        if (user.getEmail() == null) {
            user.setEmail(username + "@nexus-erp.com");
        }

        // Always re-hash with Spring's encoder to ensure compatibility
        user.setPassword(passwordEncoder.encode(rawPassword));
        user.setRole(role);
        user = userRepository.save(user);

        // Seed additional demo data tied to this user
        if (role == Role.STUDENT && studentRepository.findByUser(user).isEmpty()) {
            com.nexus.backend.model.Student s = com.nexus.backend.model.Student.builder()
                    .name(user.getName())
                    .branch("Computer Science")
                    .cgpa(8.5 + Math.random() * 1.0)
                    .feeDue(10000.0 + Math.random() * 40000)
                    .attendancePercentage((int)(75 + Math.random() * 20))
                    .completionPercentage((int)(40 + Math.random() * 50))
                    .activeCoursesCount((int)(3 + Math.random() * 4))
                    .user(user)
                    .build();
            studentRepository.save(s);
            System.out.println("[DataSeeder] Seeded Student Profile for: " + username);
        }

        System.out.println("[DataSeeder] Password and profile synced for: " + username);

        // Seed Faculty profile if role is FACULTY
        if (role == Role.FACULTY && facultyRepository.findByUser(user).isEmpty()) {
            String dept = username.equals("faculty1") ? "Information Technology" : "Mathematics";
            com.nexus.backend.model.Faculty f = com.nexus.backend.model.Faculty.builder()
                    .name(user.getName())
                    .department(dept)
                    .feedbackScore(4.5 + Math.random() * 0.5)
                    .authoredModules((int)(10 + Math.random() * 20))
                    .researchCitations((int)(50 + Math.random() * 200))
                    .industrySyncPct((int)(80 + Math.random() * 20) + "%")
                    .user(user)
                    .build();
            facultyRepository.save(f);
            System.out.println("[DataSeeder] Seeded Faculty Profile for: " + username);
        }
    }

    private void seedGlobalData() {
        if (auditLogRepository.count() == 0) {
            auditLogRepository.save(com.nexus.backend.model.AuditLog.builder().event("New Administrator Node Identification: ADMIN_SEC_01").severity("INFO").timestamp(java.time.LocalDateTime.now()).build());
            auditLogRepository.save(com.nexus.backend.model.AuditLog.builder().event("LMS Storage Matrix auto-expansion success").severity("INFO").timestamp(java.time.LocalDateTime.now()).build());
            auditLogRepository.save(com.nexus.backend.model.AuditLog.builder().event("Security block: Attempted intrusion at Node_77").severity("CRITICAL").timestamp(java.time.LocalDateTime.now()).build());
            System.out.println("[DataSeeder] Seeded Audit Logs");
        }

        if (topologyRepository.count() == 0) {
            topologyRepository.save(com.nexus.backend.model.SystemTopology.builder().nodeName("ERP Hub Alpha").loadPercentage("12%").status("Optimal").build());
            topologyRepository.save(com.nexus.backend.model.SystemTopology.builder().nodeName("LMS Knowledge Stream").loadPercentage("84%").status("Load Warning").build());
            topologyRepository.save(com.nexus.backend.model.SystemTopology.builder().nodeName("Auth Gateway Secure").loadPercentage("05%").status("Optimal").build());
            System.out.println("[DataSeeder] Seeded System Topology");
        }

        if (notificationRepository.count() < 4) {
            notificationRepository.deleteAll(); // Refresh with new varied list
            notificationRepository.save(com.nexus.backend.model.Notification.builder().type("ALARM").text("End semester exam schedules are out!").build());
            notificationRepository.save(com.nexus.backend.model.Notification.builder().type("INFO").text("Web assignment posted in CS101").build());
            notificationRepository.save(com.nexus.backend.model.Notification.builder().type("SUCCESS").text("Tuition fee payment processed successfully").build());
            notificationRepository.save(com.nexus.backend.model.Notification.builder().type("WARNING").text("Library book 'Operating Systems' is overdue").build());
            System.out.println("[DataSeeder] Seeded Notifications");
        }
        
        if (timeSlotRepository.count() == 0) {
            timeSlotRepository.save(com.nexus.backend.model.TimeSlot.builder().timeFrame("09:00 AM").title("Data Structures").location("Room 401").active(true).build());
            timeSlotRepository.save(com.nexus.backend.model.TimeSlot.builder().timeFrame("11:30 AM").title("Operating Systems").location("Lab 2").active(false).build());
            System.out.println("[DataSeeder] Seeded Time Slots");
        }

        if (courseRepository.count() < 4) {
            if (courseRepository.count() == 0 || !courseRepository.findAll().stream().anyMatch(c -> c.getName().contains("Project Management"))) {
                // Add missing ones individually if they don't exist
                com.nexus.backend.model.Course c3 = courseRepository.save(com.nexus.backend.model.Course.builder().name("Project Management").instructor("Ms. Williams").category("Business").complexity("Beginner").image("https://images.unsplash.com/photo-1454165833762-0265129b0021").rating(4.2f).studentsCount(200).description("Learn the fundamentals of Agile and Waterfall methodologies.").build());
                com.nexus.backend.model.Course c4 = courseRepository.save(com.nexus.backend.model.Course.builder().name("Cybersecurity Fundamentals").instructor("Dr. Carter").category("Security").complexity("Intermediate").image("https://images.unsplash.com/photo-1550751827-4bd374c3f58b").rating(4.9f).studentsCount(150).description("Protecting networks and systems from digital attacks.").build());
                System.out.println("[DataSeeder] Seeded Additional Courses");
            }
        }
        
        // Re-get primary courses for relationship seeding if they exist
        com.nexus.backend.model.Course c1 = courseRepository.findAll().stream().filter(c -> c.getName().contains("Web")).findFirst().orElse(null);
        com.nexus.backend.model.Course c2 = courseRepository.findAll().stream().filter(c -> c.getName().contains("Machine")).findFirst().orElse(null);

        if (c1 != null && c2 != null && subjectRepository.count() < 4) {
                com.nexus.backend.model.Subject s1 = subjectRepository.save(com.nexus.backend.model.Subject.builder().name("React Essentials").course(c1).code("CS101").room("Room 302").credit(4).status("Optimal").build());
                com.nexus.backend.model.Subject s2 = subjectRepository.save(com.nexus.backend.model.Subject.builder().name("Spring Boot API").course(c1).code("CS102").room("Lab 1").credit(4).status("Stable").build());
                com.nexus.backend.model.Subject s3 = subjectRepository.save(com.nexus.backend.model.Subject.builder().name("Python for DS").course(c2).code("DS201").room("Lab 3").credit(3).status("Optimal").build());
                com.nexus.backend.model.Subject s4 = subjectRepository.save(com.nexus.backend.model.Subject.builder().name("Neural Networks").course(c2).code("DS202").room("Room 405").credit(4).status("Warning").build());
                System.out.println("[DataSeeder] Seeded Subjects");

                if (assignmentRepository.count() < 3) {
                    assignmentRepository.save(com.nexus.backend.model.Assignment.builder().title("Build a Portfolio").description("Create a personal portfolio website.").deadline(java.time.LocalDateTime.now().plusDays(5)).priority("High").status("ACTIVE").course(c1).build());
                    assignmentRepository.save(com.nexus.backend.model.Assignment.builder().title("RESTful API Quiz").description("Theory test on REST principles.").deadline(java.time.LocalDateTime.now().plusDays(2)).priority("Medium").status("ACTIVE").course(c1).build());
                    assignmentRepository.save(com.nexus.backend.model.Assignment.builder().title("Linear Regression Lab").description("Implement LR using Scikit-Learn.").deadline(java.time.LocalDateTime.now().plusDays(10)).priority("High").status("ACTIVE").course(c2).build());
                    System.out.println("[DataSeeder] Seeded Assignments");
                }

                studentRepository.findAll().forEach(student -> {
                    // Link student to a primary course if not set
                    if (student.getCourse() == null) {
                        student.setCourse(student.getUser().getUsername().contains("1") ? c1 : c2);
                        studentRepository.save(student);
                    }

                    if (enrollmentRepository.count() < 6) {
                        enrollmentRepository.save(com.nexus.backend.model.Enrollment.builder().student(student).course(c1).progress((int)(20 + Math.random() * 60)).status("Ongoing").build());
                        enrollmentRepository.save(com.nexus.backend.model.Enrollment.builder().student(student).course(c2).progress((int)(10 + Math.random() * 40)).status("Ongoing").build());
                    }

                    if (markRepository.count() < 6) {
                        markRepository.save(com.nexus.backend.model.Mark.builder().student(student).subject(s1).marks((int)(70 + Math.random() * 25)).grade("A").build());
                        markRepository.save(com.nexus.backend.model.Mark.builder().student(student).subject(s3).marks((int)(60 + Math.random() * 30)).grade("B+").build());
                    }

                    if (attendanceRepository.count() < 10) {
                        attendanceRepository.save(com.nexus.backend.model.Attendance.builder().student(student).subject(s1).date(java.time.LocalDate.now().minusDays(1)).status(com.nexus.backend.model.AttendanceStatus.PRESENT).build());
                        attendanceRepository.save(com.nexus.backend.model.Attendance.builder().student(student).subject(s2).date(java.time.LocalDate.now().minusDays(3)).status(com.nexus.backend.model.AttendanceStatus.ABSENT).build());
                    }
                });
                System.out.println("[DataSeeder] Seeded Personalized Student Data (Enrollments, Marks, Attendance)");
            }
    }
}
