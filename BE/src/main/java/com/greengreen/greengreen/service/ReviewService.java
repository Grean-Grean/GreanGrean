package com.greengreen.greengreen.service;

import com.greengreen.greengreen.dto.request.ProductIdReqDto;
import com.greengreen.greengreen.dto.request.ReviewIdReqDto;
import com.greengreen.greengreen.dto.request.ReviewModifyReqDto;
import com.greengreen.greengreen.dto.request.ReviewRegistReqDto;
import com.greengreen.greengreen.dto.response.ReviewResDto;

import java.util.List;

public interface ReviewService {
    void addReview(ReviewRegistReqDto reviewRegistReqDto);
//    List<ReviewResDto> listReview(ProductIdReqDto productIdReqDto);
    void modifyReview(ReviewModifyReqDto reviewModifyReqDto);
    void deleteReview(Long reviewId, Long userId);
}
