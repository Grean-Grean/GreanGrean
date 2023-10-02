package com.greengreen.greengreen.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InfoValidationResDto {
    private int status;
    private String message;
}
