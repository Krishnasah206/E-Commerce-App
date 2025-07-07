package com.ecommerceApp.backend.service;

import com.ecommerceApp.backend.entity.Blog;
import com.ecommerceApp.backend.repository.BlogRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BlogServiceImpl implements BlogService {

    @Autowired
    private BlogRepository blogRepository;

    @Override
    public Blog createBlog(Blog blog) {
        return blogRepository.save(blog);
    }

    @Override
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    @Override
    public Optional<Blog> getBlogById(ObjectId id) {
        return blogRepository.findById(id);
    }

    @Override
    public Blog updateBlog(ObjectId id, Blog blog) {
        blog.setId(id); // ensure id is retained
        return blogRepository.save(blog);
    }

    @Override
    public void deleteBlog(ObjectId id) {
        blogRepository.deleteById(id);
    }
}

