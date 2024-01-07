package com.greengreen.greengreen.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResDto {

    private Long userId;
    private String userNickName;
    private String userName;

}
