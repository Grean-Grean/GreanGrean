package com.greengreen.greengreen.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Setter;

@Setter
@Builder
@AllArgsConstructor
public class FaqResDto {

    private Long faqId;
    private String faqTitle;
    private String faqContent;
}
