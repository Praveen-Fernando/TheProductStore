package com.app.store.model;

import com.app.store.enums.UserTypes;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
@Table(name = "BUYER")
public class Buyer extends User{

    @EmbeddedId
    private String user_id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "userType")
    private UserTypes usertype;

    @Column(name = "email")
    private String email;
}
