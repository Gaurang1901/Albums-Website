package com.gaurang.albumproject.config;

import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.*;


@Configuration
@OpenAPIDefinition(
  info =@Info(
    title = "Albums API",
    version = "Verions 1.0",
    contact = @Contact(
      name = "Gaurang", email = "glowalekar@gmail.com", url = "https://www.github.com/Gaurang1901"
    ),
    license = @License(
      name = "Apache 2.0", url = "https://www.apache.org/licenses/LICENSE-2.0"
    ),
    termsOfService = "https://www.github.com/Gaurang1901",
    description = "Albums RestFul API using SpringBoot"
  )
)
public class SwaggerConfig {
}
