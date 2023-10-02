package com.greengreen.greengreen.controller;

import com.greengreen.greengreen.dto.request.*;
import com.greengreen.greengreen.dto.response.ProductDetailResDto;
import com.greengreen.greengreen.dto.response.ProductResDto;
import com.greengreen.greengreen.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/product")
public class ProductController {
    private final ProductService productService;

    // 상품 등록
    @PostMapping("/add")
    public ResponseEntity<Void> productAdd(@Valid @RequestBody ProductRegistReqDto productRegistReqDto) {
        productService.addProduct(productRegistReqDto);

        return ResponseEntity.ok().build();
    }

    // 상품 전체 조회
    @GetMapping("/list")
    public ResponseEntity<List<ProductResDto>> productList() {
        List<ProductResDto> productResDtos = productService.listProduct();

        return ResponseEntity.ok()
                .body(productResDtos);
    }

    // 상품 상세 조회
    @GetMapping("/detail/{productId}")
    public ResponseEntity<ProductDetailResDto> productDetail(@PathVariable ProductIdReqDto productIdReqDto) {
        ProductDetailResDto productDetailResDto = productService.detailProduct(productIdReqDto);

        return ResponseEntity.ok()
                .body(productDetailResDto);
    }

    // 상품 검색어, 테마 조회
    @GetMapping("/search")
    public ResponseEntity<List<ProductResDto>> productSearchQuery(@RequestParam ProductQueryReqDto productQueryReqDto){
        List<ProductResDto> productResDtos = productService.searchQuery(productQueryReqDto);

        return ResponseEntity.ok()
                .body(productResDtos);
    }

    // 상품 수정
    @PutMapping("/modify/{productId}")
    public ResponseEntity<Void> productModify(@Valid @PathVariable ProductModifyReqDto productModifyReqDto) {
        productService.modifyProduct(productModifyReqDto);

        return ResponseEntity.ok().build();
    }

    // 상품 삭제
    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<Void> productDelete(@PathVariable ProductIdReqDto productIdReqDto){
        productService.deleteProduct(productIdReqDto);

        return ResponseEntity.ok().build();
    }
}
