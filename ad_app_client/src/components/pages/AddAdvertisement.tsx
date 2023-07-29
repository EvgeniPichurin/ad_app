import React from "react";
import { useDispatch } from "react-redux";
import { add } from "../../redux/actions";
import AdForm from "../forms/AdvertisementForm";
import { Advertisement } from "../../model/Advertisement";
const AddAdvertisement: React.FC = () =>
{
    const dispatch = useDispatch<any>();
    function onSubmit(advertisement: Advertisement) {
        console.log(advertisement);
        dispatch(add(advertisement));
    }
    return <AdForm submitFn={onSubmit}></AdForm>
}
export default AddAdvertisement;