package com.greengreen.greengreen.service;

import com.greengreen.greengreen.dto.request.UserRegistReqDto;
import com.greengreen.greengreen.dto.response.InfoValidationResDto;
import com.greengreen.greengreen.entity.User;
import com.greengreen.greengreen.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;

    // 회원가입
    @Override
    public void singUp(UserRegistReqDto userRegistReqDto) {
        User user = User.builder()
                .userEmail(userRegistReqDto.getUserEmail())
                .userPassword(userRegistReqDto.getUserPassword())
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

}