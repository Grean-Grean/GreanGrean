package com.greengreen.greengreen.service;

import com.greengreen.greengreen.dto.request.UserIdReqDto;
import com.greengreen.greengreen.dto.request.UserModifyReqDto;
import com.greengreen.greengreen.dto.request.UserRegistReqDto;
import com.greengreen.greengreen.dto.response.InfoValidationResDto;
import com.greengreen.greengreen.dto.response.LoginResDto;
import com.greengreen.greengreen.dto.response.PurchaseResDto;
import com.greengreen.greengreen.entity.Product;
import com.greengreen.greengreen.entity.Purchase;
import com.greengreen.greengreen.entity.User;
import com.greengreen.greengreen.enums.PurchaseStatus;
import com.greengreen.greengreen.repository.PurchaseRepository;
import com.greengreen.greengreen.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final PurchaseRepository purchaseRepository;

    // 회원가입
    @Override
    public void singUp(UserRegistReqDto userRegistReqDto) {

//        userRepository.findByUserEmail(userRegistReqDto.getUserEmail()).orElseThrow(()-> new RuntimeException("이미 등록된 이메일입니다."));
//        userRepository.findByUserNickName(userRegistReqDto.getUserNickName()).orElseThrow(()-> new RuntimeException("이미 등록된 닉네임입니다."));

        String encodedPassword = passwordEncoder.encode(userRegistReqDto.getUserPassword());

        User user = User.builder()
                .userEmail(userRegistReqDto.getUserEmail())
                .userPassword(encodedPassword)
                .userName(userRegistReqDto.getUserName())
                .userNickName(userRegistReqDto.getUserNickName())
                .build();

        userRepository.save(user);
    }

    // 닉네임 중복체크
    @Override
    public InfoValidationResDto nickNameCheck(String userNickName) {
        boolean nickNameExists = userRepository.existsByUserNickName(userNickName);

        return InfoValidationResDto.builder()
                .status(nickNameExists ? 0 : 1)
                .message(nickNameExists ? "이미 존재하는 닉네임입니다." : "사용 가능한 닉네임입니다.")
                .build();
    }

    // 이메일 중복체크
    @Override
    public InfoValidationResDto emailCheck(String userEmail) {
        boolean emailExists = userRepository.existsByUserEmail(userEmail);

        return InfoValidationResDto.builder()
                .status(emailExists ? 0 : 1)
                .message(emailExists ? "이미 등록된 이메일입니다." : "사용 가능한 이메일입니다.")
                .build();
    }

    // 로그인
    @Override
    public LoginResDto login(String userEmail, String userPassword) {
        User user = userRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("등록되지 않은 이메일입니다."));

        // 데이터베이스에서 가져온 암호화된 비밀번호와 사용자가 입력한 비밀번호 비교
        if (passwordEncoder.matches(userPassword, user.getUserPassword())) {
            // 비밀번호가 일치할 경우 로그인 성공
            return LoginResDto.builder()
                    .userId(user.getUserId())
                    .userNickName(user.getUserNickName())
                    .build();
        } else {
            // 비밀번호가 일치하지 않을 경우 로그인 실패
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }
    }

    // 회원정보 수정
    @Override
    public void modifyUser(UserModifyReqDto userModifyReqDto) {
        String encodedPassword = passwordEncoder.encode(userModifyReqDto.getUserPassword());
        userModifyReqDto.setUserPassword(encodedPassword);

        User user = userRepository.findByUserId(userModifyReqDto.getUserId())
                .orElseThrow(()->new RuntimeException("userId가 올바르지 않습니다."));
        user.modifyUser(userModifyReqDto);
    }

    // 구매 내역 조회
    @Transactional(readOnly = true)
    @Override
    public List<PurchaseResDto> purchaseHistory(Long userId) {
        List<Purchase> purchaseList = purchaseRepository.findAllByUserId(userId);
        List<PurchaseResDto> purchaseResDtos = new ArrayList<>();

        for(Purchase purchase : purchaseList){
            PurchaseStatus purchaseStatus = PurchaseStatus.valueOf(String.valueOf(purchase.getPurchaseStatus()));
            Product product = purchase.getProduct();
            PurchaseResDto p = PurchaseResDto.builder()
                            .purchaseId(purchase.getPurchaseId())
                            .purchaseName(purchase.getPurchaseName())
                            .purchaseAddress(purchase.getPurchaseAddress())
                            .purchaseNumber(purchase.getPurchaseNumber())
                            .purchaseTime(purchase.getPurchaseTime())
                            .purchasePhoneNumber(purchase.getPurchasePhoneNumber())
                            .purchaseStatus(purchaseStatus)
                            .productId(product.getProductId())
                            .productName(product.getProductName())
                            .productImg(product.getProductImg())
                            .build();
            purchaseResDtos.add(p);
        }

        return purchaseResDtos;
    }

}