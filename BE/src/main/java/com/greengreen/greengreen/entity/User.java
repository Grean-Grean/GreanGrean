package com.greengreen.greengreen.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.greengreen.greengreen.dto.request.UserModifyReqDto;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "userId")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(name = "user_email", length = 30, nullable = false)
    private String userEmail;

    @Column(name = "user_password", nullable = false)
    private String userPassword;

    @Column(name = "user_name", length = 5, nullable = false)
    private String userName;

    @Column(name = "user_nick_name", length = 20, nullable = false)
    private String userNickName;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Product> productList;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Review> reviewList;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Purchase> purchaseList;

    public void modifyUser(UserModifyReqDto userModifyReqDto){
        this.userPassword = userModifyReqDto.getUserPassword();
        this.userName = userModifyReqDto.getUserName();
        this.userNickName = userModifyReqDto.getUserNickName();
    }
}
