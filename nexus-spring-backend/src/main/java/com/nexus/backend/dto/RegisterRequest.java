package com.nexus.backend.dto;

import com.nexus.backend.model.Role;
import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private Role role;
    private String name;
    private String email;
}
