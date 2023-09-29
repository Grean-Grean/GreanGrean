package com.greengreen.greengreen.controller;

import com.greengreen.greengreen.dto.request.FaqIdReqDto;
import com.greengreen.greengreen.dto.request.FaqModifyReqDto;
import com.greengreen.greengreen.dto.request.FaqRegistReqDto;
import com.greengreen.greengreen.dto.response.FaqResDto;
import com.greengreen.greengreen.service.FaqService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/faq")
public class FaqController {
    private final FaqService faqService;

    // 글 등록
    @PostMapping("/add")
    public ResponseEntity<Void> faqAdd(@Valid @RequestBody FaqRegistReqDto faqRegistReqDto){
        faqService.addFaq(faqRegistReqDto);

        return ResponseEntity.ok().build();
    }

    // 글 전체 보기
    @GetMapping("/list")
    public ResponseEntity<List<FaqResDto>> faqList(){
        List<FaqResDto> faqResDto = faqService.listFaq();

        return ResponseEntity.ok()
                .body(faqResDto);
    }


    // 글 상세 보기
    @GetMapping("/detail/{faqId}")
    public ResponseEntity<FaqResDto> faqDetail(@RequestParam FaqIdReqDto faqIdReqDto){
        FaqResDto faqResDto = faqService.detailFaq(faqIdReqDto);

        return ResponseEntity.ok()
                .body(faqResDto);
    }

    // 글 수정
    @PutMapping("/modify/{faqId}")
    public ResponseEntity<FaqResDto> faqModify(@Valid @RequestParam FaqModifyReqDto faqModifyReqDto){
        faqService.modifyFaq(faqModifyReqDto);

        return ResponseEntity.ok().build();
    }

    // 글 삭제
    @DeleteMapping("/delete/{faqId}")
    public ResponseEntity<Void> faqDelete(@RequestParam FaqIdReqDto faqIdReqDto){
        faqService.deleteFaq(faqIdReqDto);

        return ResponseEntity.ok().build();
    }
}
