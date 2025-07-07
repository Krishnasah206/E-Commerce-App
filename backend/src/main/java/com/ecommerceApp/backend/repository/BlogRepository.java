package com.ecommerceApp.backend.repository;

import com.ecommerceApp.backend.entity.Blog;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepository extends MongoRepository<Blog, ObjectId> {
}
