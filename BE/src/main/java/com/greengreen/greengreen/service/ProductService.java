package com.greengreen.greengreen.service;

import com.greengreen.greengreen.dto.request.*;
import com.greengreen.greengreen.dto.response.ProductDetailResDto;
import com.greengreen.greengreen.dto.response.ProductResDto;

import java.util.List;

public interface ProductService {
    void addProduct(ProductRegistReqDto productRegistReqDto);
    List<ProductResDto> listProduct();
    ProductDetailResDto detailProduct(ProductIdReqDto productIdReqDto);
    List<ProductResDto> searchQuery(ProductQueryReqDto productQueryReqDto);
    void modifyProduct(ProductModifyReqDto productModifyReqDto);
    void deleteProduct(ProductIdReqDto productIdReqDto);
}
