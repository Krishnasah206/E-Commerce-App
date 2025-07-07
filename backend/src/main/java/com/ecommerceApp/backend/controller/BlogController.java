package com.ecommerceApp.backend.controller;

import com.ecommerceApp.backend.dto.BlogDTO;
import com.ecommerceApp.backend.entity.Blog;
import com.ecommerceApp.backend.repository.BlogRepository;
import com.ecommerceApp.backend.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(origins = "http://localhost:5173/")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;
    private final BlogRepository blogRepository;

    @GetMapping
    public ResponseEntity<List<BlogDTO>> getAllBlogs() {
        List<Blog> blogs = blogService.getAllBlogs();
        List<BlogDTO> dtos = blogs.stream().map(this::convertToDTO).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<BlogDTO> addBlog(@RequestBody Blog blog) {
        Blog saved = blogService.createBlog(blog);
        return ResponseEntity.ok(convertToDTO(saved));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogDTO> getBlogById(@PathVariable String id) {
        Blog blog = blogService.getBlogById(new ObjectId(id))
                .orElseThrow(() -> new RuntimeException("Blog not found"));
        return ResponseEntity.ok(convertToDTO(blog));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BlogDTO> updateBlog(@PathVariable String id, @RequestBody Blog blog) {
        Blog updated = blogService.updateBlog(new ObjectId(id), blog);
        return ResponseEntity.ok(convertToDTO(updated));
    }

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

