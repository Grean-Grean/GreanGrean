package com.greengreen.greengreen.service;

import com.greengreen.greengreen.dto.request.UserModifyReqDto;
import com.greengreen.greengreen.dto.request.UserRegistReqDto;
import com.greengreen.greengreen.dto.response.InfoValidationResDto;
import com.greengreen.greengreen.dto.response.LoginResDto;
import com.greengreen.greengreen.entity.User;
import com.greengreen.greengreen.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

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

    // 유저 정보 수정
    @Override
    public void modifyUser(UserModifyReqDto userModifyReqDto) {
        String encodedPassword = passwordEncoder.encode(userModifyReqDto.getUserPassword());
        userModifyReqDto.setUserPassword(encodedPassword);

        User user = userRepository.findByUserId(userModifyReqDto.getUserId())
                .orElseThrow(()->new RuntimeException("userId가 올바르지 않습니다."));
        user.modifyUser(userModifyReqDto);
    }

}