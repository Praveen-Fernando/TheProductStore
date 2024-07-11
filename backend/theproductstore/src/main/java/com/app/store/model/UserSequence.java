package com.app.store.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Data
@Table(name = "UserSequence")
public class UserSequence {

    @Id
    @Column(name = "id")
    private String userType;

    @Column(name = "sequence")
    private  long sequence;
}
