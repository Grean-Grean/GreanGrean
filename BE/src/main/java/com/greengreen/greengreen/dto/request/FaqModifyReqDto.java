package com.greengreen.greengreen.dto.request;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FaqModifyReqDto {

    private Long faqId;

    @NotBlank(message = "제목을 입력해야 합니다.")
    private String faqTitle;

    @NotBlank(message = "내용을 입력해야 합니다.")
    private String faqContent;

    private String userNickName;
}
