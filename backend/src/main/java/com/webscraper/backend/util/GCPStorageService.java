package com.webscraper.backend.util;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

import org.springframework.stereotype.Component;

import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

@Component
public class GCPStorageService {

    private final String bucketName = "webscraper-analyzer-bucket";

    public String uploadBytes(byte[] data, String contentType, String extension) throws Exception {

        String fileName = UUID.randomUUID() + "." + extension;

        Storage storage = StorageOptions.getDefaultInstance().getService();

        BlobId blobId = BlobId.of(bucketName, fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                .setContentType(contentType)
                .build();

        storage.create(blobInfo, data);

        return "https://storage.googleapis.com/" + bucketName + "/" + fileName;
    }


    public String uploadFile(Path path, String contentType, String extension) throws Exception {

        byte[] bytes = Files.readAllBytes(path);

        return uploadBytes(bytes, contentType, extension);
    }
}
