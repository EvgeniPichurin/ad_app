package exam.advertising.service;

import exam.advertising.dto.Advertisement;
import exam.advertising.exceptions.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class AdvertisingServiceImpl implements AdvertisingService {
    private static final int MIN_ID = 100_000_000;
    private static final int MAX_ID = 999_999_999;
    Map<Integer, Advertisement> advertisements = new HashMap<>();
    Map<String, List<Advertisement>> advertisementsByCategory = new HashMap<>();
    TreeMap<Double, List<Advertisement>> advertisementsByPrice = new TreeMap<>();

    @Override
    public Integer add(Advertisement advertisement) {
        int id;
        do {
            id = (int) ((Math.random() * (MAX_ID - MIN_ID)) + MIN_ID);
        } while (advertisements.containsKey(id));
        advertisement.id = id;
        advertisements.put(id, advertisement);
        advertisementsByCategory.computeIfAbsent(advertisement.categoryName,
                category -> new ArrayList<>()).add(advertisement);
        advertisementsByPrice.computeIfAbsent(advertisement.price,
                category -> new ArrayList<>()).add(advertisement);
        log.info("Ad with ID: {} has been added", id);
        return id;
    }

    @Override
    public Integer delete(int id) {
        try {
            Advertisement current = advertisements.remove(id);
            advertisementsByCategory.computeIfAbsent(current.categoryName,
                    category -> new ArrayList<>()).remove(current);
            advertisementsByPrice.computeIfAbsent(current.price,
                    category -> new ArrayList<>()).remove(current);
            log.info("Ad with ID: {} has been removed", id);
            return id;
        } catch (Exception e) {
            log.warn("No such ID: {}. Can't be removed", id);
            throw new NotFoundException(e.getMessage());
        }
    }

    @Override
    public Boolean update(Advertisement advertisement) {
        try {
            Advertisement current = advertisements.get(advertisement.id);
            advertisements.replace(advertisement.id, advertisement);
            advertisementsByCategory.computeIfAbsent(current.categoryName,
                    category -> new ArrayList<>()).replaceAll(ad -> ad.equals(current) ? advertisement : current);
            advertisementsByPrice.computeIfAbsent(current.price,
                    category -> new ArrayList<>()).replaceAll(ad -> ad.equals(current) ? advertisement : current);
            log.info("Ad with ID: {} has been updated", advertisement.id);
            return true;
        } catch (Exception e) {
            log.warn("No such ID: {}. Can't be updated", advertisement.id);
            throw new NotFoundException(e.getMessage());
        }
    }

    @Override
    public Advertisement get(int id) {
        return advertisements.get(id);
    }

    @Override
    public List<Advertisement> getAll() {
        return advertisements.values().stream().toList();
    }

    @Override
    public List<Advertisement> getByCategory(String category) {
        List<Advertisement> res = advertisementsByCategory.get(category);
        return res != null ? res : new ArrayList<>();
    }

    @Override
    public List<Advertisement> getByMaxPrice(Double maxPrice) {
        return advertisementsByPrice.headMap(maxPrice).values()
                .stream()
                .flatMap(Collection::stream)
                .toList();
    }
}
