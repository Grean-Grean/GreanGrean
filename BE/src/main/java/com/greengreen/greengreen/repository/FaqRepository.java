package com.greengreen.greengreen.repository;

import com.greengreen.greengreen.entity.Faq;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FaqRepository extends JpaRepository<Faq, Long> {

    Optional<Faq> findByFaqId(Long faqId);
    Optional<Faq> deleteByFaqId(Long faqId);
}
