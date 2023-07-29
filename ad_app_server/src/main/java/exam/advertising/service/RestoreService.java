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
            .itemDetails("Color: black, Engine: 1.6")
            .build();

    Advertisement houseAd = Advertisement.builder()
            .categoryName("Houses")
            .price(2_500_000.00)
            .itemName("Apartment")
            .itemDetails("City: Rishon LeZion, Street: Herzel 37, Rooms: 3")
            .build();

    Advertisement electricalProductsAd = Advertisement.builder()
            .categoryName("Electrical")
            .price(2_780.00)
            .itemName("TV")
            .itemDetails("Firm: LG, Size: 50")
            .build();

    public List<Advertisement> getDefaultAds() {
        ArrayList<Advertisement> res = new ArrayList<>();
        res.add(carAd);
        res.add(houseAd);
        res.add(electricalProductsAd);
        return res;
    }
}
