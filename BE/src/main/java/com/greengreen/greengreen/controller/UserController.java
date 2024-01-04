package com.greengreen.greengreen.controller;

import com.amazonaws.Response;
import com.greengreen.greengreen.dto.request.*;
import com.greengreen.greengreen.dto.response.InfoValidationResDto;
import com.greengreen.greengreen.dto.response.LoginResDto;
import com.greengreen.greengreen.dto.response.PurchaseResDto;
import com.greengreen.greengreen.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
    private final UserService userService;

    // 회원가입
    @PostMapping("/regist")
    public ResponseEntity<Void> userRegist(@Valid @RequestBody UserRegistReqDto userRegistReqDto){
        userService.singUp(userRegistReqDto);

        return ResponseEntity.ok().build();
    }

    // 닉네임 중복체크
    @PostMapping("/nickname")
    public ResponseEntity<InfoValidationResDto> checkNickName(@Valid @RequestBody NickNameCheckReqDto nickNameCheckReqDto){
        InfoValidationResDto infoValidationResDto = userService.nickNameCheck(nickNameCheckReqDto.getUserNickName());

        return ResponseEntity.ok()
                .body(infoValidationResDto);
    }

    // 이메일 중복체크
    @PostMapping("/email")
    public ResponseEntity<InfoValidationResDto> checkEmail(@Valid @RequestBody EmailCheckReqDto emailCheckReqDto){
        InfoValidationResDto infoValidationResDto = userService.emailCheck(emailCheckReqDto.getUserEmail());

        return ResponseEntity.ok()
                .body(infoValidationResDto);

    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<LoginResDto>  userLogin(@Valid @RequestBody LoginReqDto loginReqDto){
        LoginResDto loginResDto = userService.login(loginReqDto.getUserEmail(), loginReqDto.getUserPassword());

        return ResponseEntity.ok()
                .body(loginResDto);
    }

    // 회원정보 수정
    @PutMapping("/modify")
    public ResponseEntity<Void> userModify(@Valid @RequestBody UserModifyReqDto userModifyReqDto){
        userService.modifyUser(userModifyReqDto);

        return ResponseEntity.ok().build();
    }

    // 주문 내역 조회
    @GetMapping("/purchasehistory/{userId}")
    public ResponseEntity<List<PurchaseResDto>> purchaseHistory(@PathVariable Long userId){
        List<PurchaseResDto> purchaseResDtos = userService.purchaseHistory(userId);

        return ResponseEntity.ok()
                .body(purchaseResDtos);
    }


}