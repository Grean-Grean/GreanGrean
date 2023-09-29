package com.greengreen.greengreen.service;

import com.greengreen.greengreen.dto.request.FaqIdReqDto;
import com.greengreen.greengreen.dto.request.FaqModifyReqDto;
import com.greengreen.greengreen.dto.request.FaqRegistReqDto;
import com.greengreen.greengreen.dto.response.FaqResDto;

import java.util.List;

public interface FaqService {
    void addFaq(FaqRegistReqDto faqRegistReqdto);
    List<FaqResDto> listFaq();
    FaqResDto detailFaq(FaqIdReqDto faqIdReqDto);
    void modifyFaq(FaqModifyReqDto faqModifyReqDto);
    void deleteFaq(FaqIdReqDto faqIdReqDto);
}
