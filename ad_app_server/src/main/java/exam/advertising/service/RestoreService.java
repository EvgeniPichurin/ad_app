package exam.advertising.service;

import exam.advertising.dto.Advertisement;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RestoreService {

    Advertisement carAd = Advertisement.builder()
            .categoryName("Cars")
            .price(125_000.00)
            .itemName("Mazda")
            .build();

    Advertisement houseAd = Advertisement.builder()
            .categoryName("Houses")
            .price(2_500_000.00)
            .itemName("Apartment")
            .build();

    Advertisement electricalProductsAd = Advertisement.builder()
            .categoryName("Electrical products")
            .price(2_780.00)
            .itemName("TV")
            .build();

    public List<Advertisement> getDefaultAds() {
        ArrayList<Advertisement> res = new ArrayList<>();
        res.add(carAd);
        res.add(houseAd);
        res.add(electricalProductsAd);
        return res;
    }
}
