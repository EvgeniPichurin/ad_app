import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Advertisement} from "../../model/Advertisement";
import {StateType} from "../../redux/store";
import {DataGrid, GridActionsCellItem, GridRowParams} from '@mui/x-data-grid'
import {Box, List, ListItem, Modal, Paper} from "@mui/material";
import {Delete, Edit, Visibility} from "@mui/icons-material";
import {remove, update} from "../../redux/actions";
import AdForm from "../forms/AdvertisementForm";
import ActionConfirmation from "../dialogs/ActionConfirmation";
import ConfirmationData from "../../model/ConfirmationData";
import useLayout from "../../util/useLayout";
import adData from "../../config/adData.json";

function getActions(actionsFn: (params: GridRowParams) => JSX.Element[], layout: string): any {
    const columns: any = [
        {
            field: "id",
            type: "string",
            headerName: "ID",
            align: "center",
            headerAlign: "center",
            flex: 0.5
        },
        {
            field: "categoryName",
            type: "string",
            headerName: "Category Name",
            align: "center",
            headerAlign: "center",
            flex: 1
        },
        {
            field: "itemName",
            type: "string",
            headerName: "Item Name",
            align: "center",
            headerAlign: "center",
            flex: 0.7
        },
        {
            field: "price",
            type: "number",
            headerName: "Price",
            align: "right",
            headerAlign: "center",
            flex: 0.5
        },
        {
            field: "actions",
            type: "actions",
            headerName: "actions",
            flex: 0.5,
            getActions: actionsFn
        }
    ]
    return columns.filter((c: { field: any; }) => (adData as any)[layout].includes(c.field));
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Ads: React.FC = () => {
    const dispatch = useDispatch<any>();
    const advertisements: Advertisement[] = useSelector<StateType, Advertisement[]>(state => state.advertisements);
    const [isEdit, setEdit] = React.useState(false);
    const [flOpen, setFlOpen] = React.useState<boolean>(false);
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const confirmationData = React.useRef<ConfirmationData>({
        title: '', content: '', confirmHandler: () => {
        }
    });
    const updatedAd = React.useRef<Advertisement>();
    const shownAd = React.useRef<Advertisement>();
    const layout = useLayout();

    function actionsFn(params: GridRowParams): JSX.Element[] {
        return [
            <GridActionsCellItem label="Details" icon={<Visibility/>}
                                 onClick={showDetails.bind(undefined, params.id as number)}/>,
            <GridActionsCellItem label="Edit" onClick={() => editFn(params.id as number)}
                                 icon={<Edit/>}/>,
            <GridActionsCellItem label="Remove" onClick={() => showRemoveConfirmation(params.id as number)}
                                 icon={<Delete/>}/>

        ];
    }

    function showDetails(id: number) {
        shownAd.current = advertisements.find(a => a.id === id);
        setModalOpen(true);
    }

    function showRemoveConfirmation(id: number) {
        confirmationData.current.confirmHandler = removeAction.bind(undefined, id);
        confirmationData.current.title = 'Remove Ad Confirmation'
        confirmationData.current.content = `${id}אתם עומדים למחוק מודעה עם המזהה - `;
        setFlOpen(true);
    }

    function removeAction(id: number, flConfirm: boolean): void {
        if (flConfirm) {
            dispatch(remove(id))
        }
        setFlOpen(false)
    }

    function editFn(id: number) {
        updatedAd.current = advertisements.find(a => a.id === id)
        setEdit(true);
    }

    function showUpdateConfirmation(advertisement: Advertisement) {
        if (isUpdated(advertisements, advertisement)) {
            confirmationData.current.confirmHandler = updateAction.bind(undefined, advertisement);
            confirmationData.current.title = 'Update Course Confirmation'
            confirmationData.current.content = `${advertisement.id}אתם עומדים לשנות מודעה עם המזהה - `;
            setFlOpen(true);
        }
        setEdit(false);
    }

    function updateAction(advertisement: Advertisement, flConfirm: boolean): void {
        if (flConfirm) {
            dispatch(update(advertisement))
        }
        setFlOpen(false);
    }

    const getActionsCallback = useCallback(getActions, [advertisements, layout]);
    const columns = getActionsCallback(actionsFn, layout);

    return <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Paper sx={{height: {xs: '90vh', sm: '85vh', md: '80vh'}, width: {xs: '100%', md: '80%'}}}>
            {isEdit ? <AdForm submitFn={showUpdateConfirmation} adUpdate={updatedAd.current}/>
                : <DataGrid rows={advertisements} columns={columns}/>}
        </Paper>
        <ActionConfirmation open={flOpen} title={confirmationData.current.title}
                            content={confirmationData.current.content}
                            confirmHandler={confirmationData.current.confirmHandler}/>
        <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <List>
                    {shownAd.current && Object.entries(shownAd.current as any).map(e => <ListItem
                        key={e[0]}>{`${e[0]}: ${e[1]}`}</ListItem>)}
                </List>
            </Box>
        </Modal>
    </Box>
}
export default Ads;

function isUpdated(advertisements: Advertisement[], newAd: Advertisement): boolean {
    const adOld = advertisements.find(a => a.id === newAd.id);
    const adOldJson = JSON.stringify(adOld);
    const adNewJson = JSON.stringify(newAd);
    return !!adOld && adOldJson !== adNewJson;
}