package com.greengreen.greengreen.dto.request;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserModifyReqDto {
    private Long userId;

    @NotBlank(message = "비밀번호를 입력해야 합니다.")
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$", message = "비밀번호는 영문, 숫자, 특수기호 포함 8자리 이상이여야 합니다.")
    private String userPassword;

    @NotBlank(message = "이름을 입력해야 합니다.")
    private String userName;

    @NotBlank(message = "별명을 입력해야 합니다.")
    private String userNickName;
}