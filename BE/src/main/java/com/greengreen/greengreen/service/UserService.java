package com.greengreen.greengreen.service;

import com.greengreen.greengreen.dto.request.UserRegistReqDto;
import com.greengreen.greengreen.dto.response.InfoValidationResDto;

public interface UserService {

    public void singUp(UserRegistReqDto userRegistReqDto);

    InfoValidationResDto nickNameCheck(String userNickName);

    InfoValidationResDto emailCheck(String userEmail);
}