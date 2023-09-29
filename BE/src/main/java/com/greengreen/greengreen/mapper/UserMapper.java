package com.greengreen.greengreen.mapper;

import com.greengreen.greengreen.dto.request.UserRegistReqDto;
import com.greengreen.greengreen.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    User userRegistReqDtoToUser(UserRegistReqDto userRegistReqDto);
}
