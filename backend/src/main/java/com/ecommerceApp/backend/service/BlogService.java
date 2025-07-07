package com.ecommerceApp.backend.service;

import com.ecommerceApp.backend.entity.Blog;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.Optional;

public interface BlogService {
    Blog createBlog(Blog blog);
    List<Blog> getAllBlogs();
    Optional<Blog> getBlogById(ObjectId id);
    Blog updateBlog(ObjectId id, Blog blog);
    void deleteBlog(ObjectId id);
}
