package exam.advertising.controller;

import exam.advertising.dto.Advertisement;
import exam.advertising.service.AdvertisingService;
import exam.advertising.service.RestoreService;
import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("ads")
@CrossOrigin
@Slf4j
public class AdvertisingController {
    @Value("${app.message.wrong.operation}")
    String wrongOperationMessage;
    AdvertisingService advertisingService;
    RestoreService restoreService;

    public AdvertisingController(AdvertisingService advertisingService, RestoreService restoreService) {
        this.advertisingService = advertisingService;
        this.restoreService = restoreService;
    }

    /**
     * Getting advertisement by id.
     *
     * @param id positive value [100,000,000 - 999,999,999]
     * @return advertisement with the given id or NULL if there is no such id.
     */
    @GetMapping("/{id}")
    Advertisement get(@PathVariable("id") Integer id) {
        log.debug("GET request for getting advertisement with id {}", id);
        return advertisingService.get(id);
    }

    /**
     * Getting all advertisements.
     *
     * @return the list of advertisements
     */
    @GetMapping("/all")
    List<Advertisement> getAll() {
        log.debug("GET request for getting all advertisements");
        return advertisingService.getAll();
    }

    /**
     * Getting all advertisements under the given price.
     *
     * @param maxPrice max price
     * @return the list of advertisements under the given price.
     */
    @GetMapping("/price/{maxPrice}")
    List<Advertisement> getByMaxPrice(@PathVariable("maxPrice") Double maxPrice) {
        log.debug("GET request for getting advertisements with max price: {}", maxPrice);
        return advertisingService.getByMaxPrice(maxPrice);
    }

    /**
     * Getting all advertisements by the given category.
     *
     * @param category category of the item
     * @return the list of advertisements under the given price.
     */
    @GetMapping("/category/{category}")
    List<Advertisement> getByCategory(@PathVariable("category") String category) {
        log.debug("GET request for getting advertisements with max price: {}", category);
        return advertisingService.getByCategory(category);
    }

    /**
     * Add new advertisement.
     *
     * @param advertisement new advertisement
     * @return message of the result.
     */
    @PostMapping("/add")
    String add(@RequestBody @Valid Advertisement advertisement) {
        log.debug("POST request for adding advertisement for category: {}.", advertisement.categoryName);
        return String.format("Advertisement with id: %s has been added", advertisingService.add(advertisement));
    }

    /**
     * Update the advertisement.
     *
     * @param advertisement changed advertisement
     * @return message of the result.
     */
    @PutMapping
    String update(@RequestBody @Valid Advertisement advertisement) {
        log.debug("PUT request for updating advertisement from category: {}.", advertisement.categoryName);
        return String.format("Advertisement with id: %s has been updated", advertisingService.update(advertisement));
    }

    /**
     * Remove advertisement by given id.
     *
     * @param id positive value [100,000,000 - 999,999,999]
     * @return message of the result.
     */
    @DeleteMapping("/{id}")
    String delete(@PathVariable("id") Integer id) {
        log.debug("DELETE request for advertisement with id: {}.", id);
        return String.format("Advertisement with id: %s has been removed", advertisingService.delete(id));
    }

    @PostConstruct
    void restoreAds() {
        List<Advertisement> defaultAds = restoreService.getDefaultAds();
        for (Advertisement defaultAd : defaultAds) {
            advertisingService.add(defaultAd);
        }
        log.debug("Current number of ads: {}", advertisingService.getAll().size());
    }
}