package com.greengreen.greengreen.service;

import com.greengreen.greengreen.dto.response.InfoValidationResDto;
import com.greengreen.greengreen.entity.User;

public interface UserService {

    public void singUp(User user);

    InfoValidationResDto nickNameCheck(String userNickName);

    InfoValidationResDto emailCheck(String userEmail);
}
