package com.greengreen.greengreen.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class FaqIdReqDto {

    private Long faqId;
    private String userNickName;
}
