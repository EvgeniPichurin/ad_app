package exam.advertising.service;

import exam.advertising.dto.Advertisement;

import java.util.List;

public interface AdvertisingService {
    Integer add(Advertisement advertisement);

    Integer delete(int id);

    Boolean update(Advertisement advertisement);

    Advertisement get(int id);

    List<Advertisement> getAll();

    List<Advertisement> getByCategory(String category);

    List<Advertisement> getByMaxPrice(Double maxPrice);
}
