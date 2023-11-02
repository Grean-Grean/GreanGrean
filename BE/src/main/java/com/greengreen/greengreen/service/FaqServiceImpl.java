package com.greengreen.greengreen.service;

import com.greengreen.greengreen.dto.request.FaqIdReqDto;
import com.greengreen.greengreen.dto.request.FaqModifyReqDto;
import com.greengreen.greengreen.dto.request.FaqRegistReqDto;
import com.greengreen.greengreen.dto.response.FaqResDto;
import com.greengreen.greengreen.entity.Faq;
import com.greengreen.greengreen.repository.FaqRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class FaqServiceImpl implements FaqService{
    private final FaqRepository faqRepository;

    // 글 등록
    @Override
    public void addFaq(FaqRegistReqDto faqRegistReqdto) {
        if(faqRegistReqdto.getUserNickName().equals("admin")) {
            Faq faq = Faq.builder()
                    .faqTitle(faqRegistReqdto.getFaqTitle())
                    .faqContent(faqRegistReqdto.getFaqContent())
                    .build();

            faqRepository.save(faq);
        } else{
            throw new RuntimeException("관리자만 작성할 수 있습니다");
        }
    }

    // 글 전체 보기
    @Transactional(readOnly = true)
    @Override
    public List<FaqResDto> listFaq() {
        List<Faq> faqList = faqRepository.findAll();
        List<FaqResDto> faqResDtos = new ArrayList<>();

        for (Faq faq: faqList) {
            FaqResDto f = FaqResDto.builder()
                    .faqId(faq.getFaqId())
                    .faqTitle(faq.getFaqTitle())
                    .faqContent(faq.getFaqContent())
                    .build();
            faqResDtos.add(f);
        }

        return faqResDtos;
    }

    // 글 상세 보기
    @Transactional(readOnly = true)
    @Override
    public FaqResDto detailFaq(FaqIdReqDto faqIdReqDto) {
        Faq faq = faqRepository.findByFaqId(faqIdReqDto.getFaqId())
                .orElseThrow(()->new RuntimeException("FaqId가 올바르지 않습니다."));
        FaqResDto faqResDto = FaqResDto.builder()
                .faqId(faq.getFaqId())
                .faqTitle(faq.getFaqTitle())
                .faqContent(faq.getFaqContent())
                .build();

        return faqResDto;
    }

    // 글 수정
    @Override
    public void modifyFaq(FaqModifyReqDto faqModifyReqDto) {
        if(faqModifyReqDto.getUserNickName().equals("admin")) {
            Faq faq = faqRepository.findByFaqId(faqModifyReqDto.getFaqId())
                    .orElseThrow(()->new RuntimeException("FaqId가 올바르지 않습니다."));
            faq.modifyFaq(faqModifyReqDto.getFaqTitle(), faqModifyReqDto.getFaqContent());
        } else{
            throw new RuntimeException("관리자만 수정할 수 있습니다");
        }
    }

    // 글 삭제
    @Override
    public void deleteFaq(Long faqId, String userNickName) {
        if(userNickName.equals("admin")) {
            faqRepository.deleteByFaqId(faqId)
                    .orElseThrow(()->new RuntimeException("FaqId가 올바르지 않습니다."));
        } else{
            throw new RuntimeException("관리자만 삭제할 수 있습니다");
        }
    }
}
