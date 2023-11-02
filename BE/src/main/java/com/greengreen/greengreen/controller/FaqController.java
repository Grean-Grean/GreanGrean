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
@CrossOrigin("*")
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
    public ResponseEntity<FaqResDto> faqDetail(@PathVariable FaqIdReqDto faqIdReqDto){
        FaqResDto faqResDto = faqService.detailFaq(faqIdReqDto);

        return ResponseEntity.ok()
                .body(faqResDto);
    }

    // 글 수정
    @PutMapping("/modify")
    public ResponseEntity<Void> faqModify(@Valid @RequestBody FaqModifyReqDto faqModifyReqDto){
        faqService.modifyFaq(faqModifyReqDto);

        return ResponseEntity.ok().build();
    }

    // 글 삭제
    @DeleteMapping("/delete")
    public ResponseEntity<Void> faqDelete(@RequestParam Long faqId, @RequestParam String userNickName ){
        faqService.deleteFaq(faqId, userNickName);

        return ResponseEntity.ok().build();
    }
}
