package com.gaurang.albumproject.payload.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.Schema.RequiredMode;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ResetPasswordDTO {

    String token;

    @Size(min = 6, max = 20)
    @Schema(description = "Password", example = "Password", requiredMode = RequiredMode.REQUIRED, maxLength = 20, minLength = 6)
    String password;
}
