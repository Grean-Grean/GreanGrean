package com.greengreen.greengreen.controller;

import com.greengreen.greengreen.dto.request.*;
import com.greengreen.greengreen.dto.response.ProductDetailResDto;
import com.greengreen.greengreen.dto.response.ProductResDto;
import com.greengreen.greengreen.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.implementation.bind.annotation.Default;
import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/product")
@CrossOrigin("*")
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
    public ResponseEntity<ProductDetailResDto> productDetail(@PathVariable Long productId) {
        ProductDetailResDto productDetailResDto = productService.detailProduct(productId);

        return ResponseEntity.ok()
                .body(productDetailResDto);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductResDto>> productSearchQuery(@RequestParam(required = false, defaultValue = "") String query, @RequestParam(required = false, defaultValue = "") String category) {
        List<ProductResDto> productResDtos = null;
        if (query.isEmpty() && category.isEmpty()) {
            productResDtos = productService.listProduct();
        } else if (category.isEmpty()) {
            productResDtos = productService.queryProduct(query);
        } else {
            productResDtos = productService.searchQuery(query, category);
        }
        return ResponseEntity.ok().body(productResDtos);
    }

    // 상품 수정
    @PutMapping("/modify")
    public ResponseEntity<Void> productModify(@Valid @RequestBody ProductModifyReqDto productModifyReqDto) {
        productService.modifyProduct(productModifyReqDto);

        return ResponseEntity.ok().build();
    }

    // 상품 삭제
    @DeleteMapping("/delete/{productId}/{userId}")
    public ResponseEntity<Void> productDelete(@PathVariable Long productId, @PathVariable Long userId){
        productService.deleteProduct(productId, userId);

        return ResponseEntity.ok().build();
    }
}
