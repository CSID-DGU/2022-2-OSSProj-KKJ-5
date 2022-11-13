package com.url.OSSProj.domain.entity;

import com.url.OSSProj.BaseTimeEntity;
import com.url.OSSProj.domain.enums.UserRole;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Member extends BaseTimeEntity implements Serializable {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEMBER_ID")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Setter
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;

//    @OneToMany(mappedBy = "url")
//    private List<Url> urls;
//
//    @OneToMany(mappedBy = "member")
//    private List<ChatRoomList> chatRooms = new ArrayList<ChatRoomList>();

    public String getRoleKey(){
        return this.role.getKey();
    }


}
