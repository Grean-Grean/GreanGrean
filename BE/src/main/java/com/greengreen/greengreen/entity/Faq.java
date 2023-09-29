package com.greengreen.greengreen.entity;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Getter
@Setter
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@EqualsAndHashCode(of = "faqId")
public class Faq {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long faqId;

    @Column(name = "fag_title", nullable = false)
    private String faqTitle;

    @Column(name = "faq_content", nullable = false)
    private String fagContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;
}
