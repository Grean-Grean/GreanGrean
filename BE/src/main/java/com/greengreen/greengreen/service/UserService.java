package com.greengreen.greengreen.service;

import com.greengreen.greengreen.dto.request.UserIdReqDto;
import com.greengreen.greengreen.dto.request.UserModifyReqDto;
import com.greengreen.greengreen.dto.request.UserRegistReqDto;
import com.greengreen.greengreen.dto.response.*;

import java.util.List;

public interface UserService {

    public void singUp(UserRegistReqDto userRegistReqDto);

    public InfoValidationResDto nickNameCheck(String userNickName);

    public InfoValidationResDto emailCheck(String userEmail);

    public LoginResDto login(String userEmail, String userPassword);

    public void modifyUser(UserModifyReqDto userModifyReqDto);

    public void deleteUser(Long userId);

    List<PurchaseResDto> purchaseHistory(Long userId);

    List<ProductResDto> productHistory(Long userId);

    List<PurchaseHistoryResDto> orderHistory(Long userId);

    List<PurchaseHistoryResDto> acceptHistory(Long userId);

}
