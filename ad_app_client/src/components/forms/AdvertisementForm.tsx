import React from "react";
import {Advertisement, createAd} from "../../model/Advertisement";
import adData from "../../config/adData.json";
import {Grid, TextField, MenuItem, Button, Box, Typography} from "@mui/material";

type Props = {
    submitFn: (advertisement: Advertisement) => void;
    adUpdate?: Advertisement
}
const initialAd: Advertisement = createAd(111111, "",
    0, "", "");
const AdForm: React.FC<Props> = ({submitFn, adUpdate}) => {
    const {minPrice} = adData;
    const [advertisement, setAdvertisement] = React.useState(adUpdate || initialAd);

    function onSubmit(event: any) {
        event.preventDefault();
        submitFn(advertisement);
        document.querySelector('form')!.reset();
    }

    function handlerCategory(event: any) {
        const adCopy = {...advertisement};
        adCopy.categoryName = event.target.value;
        setAdvertisement(adCopy);
    }

    function handlerItemName(event: any) {
        const adCopy = {...advertisement};
        adCopy.itemName = event.target.value;
        setAdvertisement(adCopy);
    }

    function handlerPrice(event: any) {
        const adCopy = {...advertisement};
        adCopy.price = event.target.value;
        setAdvertisement(adCopy);
    }

    function handlerDetails(event: any) {
        const adCopy = {...advertisement};
        adCopy.itemDetails = event.target.value;
        setAdvertisement(adCopy);
    }

    function onReset() {
        setAdvertisement(adUpdate || initialAd)
    }

    return <Box>
        <Typography gutterBottom variant={'h4'}
                    sx={{fontSize: {xs: "1.3em", sm: "1em", md: "2em"}, textAlign: 'center', fontWeight: 'bold'}}>
            {!!adUpdate ? `Update of Ad with id ${adUpdate.id}` : 'Adding new advertisement'}</Typography>
        <form onSubmit={onSubmit} onReset={onReset}>
            <Grid container spacing={{xs: 5, sm: 1.5, md: 13}} justifyContent="center">
                <Grid item xs={10} sm={5}>
                    <TextField label="קטגוריה"
                               fullWidth
                               required
                               value={advertisement.categoryName}
                               onChange={handlerCategory}
                               helperText={`הזן קטגוריה`}
                    />
                </Grid>
                <Grid item xs={10} sm={5}>
                    <TextField label="שם הפריט/נכס"
                               fullWidth
                               required
                               value={advertisement.itemName}
                               onChange={handlerItemName}
                               helperText={`הזן שם הפריט/נכס`}
                    />
                </Grid>
                <Grid item xs={10} sm={5}>
                    <TextField type="number" label="מחיר"
                               fullWidth
                               required
                               value={advertisement.price}
                               onChange={handlerPrice}
                               helperText={`הזן מחיר`}
                               inputProps={{
                                   min: `${minPrice}`,
                               }}/>
                </Grid>
                <Grid item xs={10} sm={5}>
                    <TextField label="פרטים נוספים"
                               fullWidth
                               value={advertisement.itemDetails}
                               onChange={handlerDetails}
                               helperText={`הזן שם הפריט/נכס`}
                    />
                </Grid>
                <Grid item xs={10} sm={8} md={6}>
                    <Grid container justifyContent={"center"}>
                        <Grid item xs={5}>
                            <Button type="submit">אישור</Button>
                        </Grid>
                        <Grid item xs={5}>
                            <Button type="reset">איפוס</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    </Box>
}
export default AdForm;

function getAdItems(items: string[]): React.ReactNode {
    return items.map(a => <MenuItem value={a} key={a}>{a}</MenuItem>)
}