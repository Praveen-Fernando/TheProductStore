package com.app.store.repository;

import com.app.store.model.UserSequence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSequenceRepository extends JpaRepository<UserSequence, String> {
}
