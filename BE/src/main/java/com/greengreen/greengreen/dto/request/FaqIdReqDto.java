package com.greengreen.greengreen.dto.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FaqIdReqDto {

    private Long faqId;
    private String userNickName;
}
