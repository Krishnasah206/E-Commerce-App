package com.ecommerceApp.backend.controller;

import com.ecommerceApp.backend.dto.BlogDTO;
import com.ecommerceApp.backend.entity.Blog;
import com.ecommerceApp.backend.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(origins = "http://localhost:5173/")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;

    // ✅ Public - View all blogs
    @GetMapping
    public ResponseEntity<List<BlogDTO>> getAllBlogs() {
        List<Blog> blogs = blogService.getAllBlogs();
        List<BlogDTO> dtos = blogs.stream().map(this::convertToDTO).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    // ✅ Public - View specific blog
    @GetMapping("/{id}")
    public ResponseEntity<BlogDTO> getBlogById(@PathVariable String id) {
        Blog blog = blogService.getBlogById(new ObjectId(id))
                .orElseThrow(() -> new RuntimeException("Blog not found"));
        return ResponseEntity.ok(convertToDTO(blog));
    }

    // ✅ Admin only
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<BlogDTO> addBlog(@RequestBody Blog blog) {
        Blog saved = blogService.createBlog(blog);
        return ResponseEntity.ok(convertToDTO(saved));
    }

    // ✅ Admin only
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<BlogDTO> updateBlog(@PathVariable String id, @RequestBody Blog blog) {
        Blog updated = blogService.updateBlog(new ObjectId(id), blog);
        return ResponseEntity.ok(convertToDTO(updated));
    }

    // ✅ Admin only
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable String id) {
        blogService.deleteBlog(new ObjectId(id));
        return ResponseEntity.noContent().build();
    }

    private BlogDTO convertToDTO(Blog blog) {
        return BlogDTO.builder()
                .id(blog.getId().toHexString())
                .name(blog.getName())
                .image(blog.getImage())
                .description(blog.getDescription())
                .build();
    }
}


