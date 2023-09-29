package com.greengreen.greengreen.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Setter;

@Setter
@Builder
@AllArgsConstructor
public class InfoValidationResDto {
    private int status;
    private String message;
}
