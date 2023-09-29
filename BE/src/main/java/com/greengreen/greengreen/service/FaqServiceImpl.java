package com.greengreen.greengreen.service;

import com.greengreen.greengreen.entity.Faq;
import com.greengreen.greengreen.repository.FaqRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class FaqServiceImpl implements FaqService{
    private final FaqRepository faqRepository;

    @Override
    public void addFaq() {

    }

    @Override
    public void listFaq() {

    }

    @Override
    public void detailFaq() {

    }

    @Override
    public void modifyFaq() {

    }

    @Override
    public void deleteFaq() {

    }
}
