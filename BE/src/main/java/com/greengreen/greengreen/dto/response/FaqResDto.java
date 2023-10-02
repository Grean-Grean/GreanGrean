package com.greengreen.greengreen.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FaqResDto {

    private Long faqId;
    private String faqTitle;
    private String faqContent;
}
