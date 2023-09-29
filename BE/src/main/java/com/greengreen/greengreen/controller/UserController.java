package com.greengreen.greengreen.controller;

import com.greengreen.greengreen.dto.request.EmailCheckReqDto;
import com.greengreen.greengreen.dto.request.NickNameCheckReqDto;
import com.greengreen.greengreen.dto.request.UserRegistReqDto;
import com.greengreen.greengreen.dto.response.InfoValidationResDto;
import com.greengreen.greengreen.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    // 회원가입
    @PostMapping("/regist")
    public ResponseEntity<Void> userRegist(@Valid @RequestBody UserRegistReqDto userRegistReqDto){
        userService.singUp(userMapper.userRegistReqDtoToUser(userRegistReqDto));

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
//    @PostMapping("/login")
//    public ResponseEntity<>


}