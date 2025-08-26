package com.ecommerceApp.backend.controller;

import com.ecommerceApp.backend.service.ProductCsvExportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@RestController
@RequiredArgsConstructor
public class ProductCsvExportController {

    private final ProductCsvExportService csvExportService;

    @GetMapping("/products/export/csv")
    public void exportProductsToCsv(HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=products.csv");
        PrintWriter writer = response.getWriter();
        csvExportService.writeProductsToCsv(writer);
    }
}
