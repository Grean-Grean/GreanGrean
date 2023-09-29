package com.greengreen.greengreen.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
public class FaqRegistReqDto {

    @NotBlank(message = "제목을 입력해야 합니다.")
    private String faqTitle;

    @NotBlank(message = "내용을 입력해야 합니다.")
    private String faqContent;

    private String userNickName;
}
