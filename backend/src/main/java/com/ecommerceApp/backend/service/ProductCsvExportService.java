package com.ecommerceApp.backend.service;

import com.ecommerceApp.backend.entity.Product;
import com.ecommerceApp.backend.repository.ProductRepository;
import com.opencsv.CSVWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.PrintWriter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductCsvExportService {

    private final ProductRepository productRepository;

    public void writeProductsToCsv(PrintWriter writer) {
        List<Product> products = productRepository.findAll();

        // Use try-with-resources for CSVWriter (automatically closes it)
        try (CSVWriter csvWriter = new CSVWriter(writer)) {
            // CSV Header
            String[] header = {"ID", "Product Name", "Brand", "Category", "SubCategory",
                    "Rating", "MRP", "Discount", "Stock", "Description", "Images"};
            csvWriter.writeNext(header);

            // Data rows
            for (Product p : products) {
                String[] data = {
                        p.getId().toString(),
                        p.getProductName(),
                        p.getBrand(),
                        p.getCategory(),
                        p.getSubCategory() != null ? p.getSubCategory() : "",
                        String.valueOf(p.getRating()),
                        String.valueOf(p.getMrp()),
                        String.valueOf(p.getDiscount()),
                        String.valueOf(p.getStock()),
                        p.getDescription(),
                        p.getImages() != null ? String.join(";", p.getImages()) : ""
                };
                csvWriter.writeNext(data);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error writing products to CSV", e);
        }
    }
}
