import React, {useEffect, useRef} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {ADS_PATH, ROUTES} from './config/routes-config';
import Navigator from './components/navigators/Navigator';
import {useDispatch, useSelector} from 'react-redux';
import {StateType} from './redux/store';
import {RouteType} from './model/RouteType';
import {adService} from './config/service-config';
import {setAds, setOperationCode} from './redux/actions';
import {OperationCode} from './model/OperationCode';
import {Box, Alert, LinearProgress} from '@mui/material';
import {Advertisement} from './model/Advertisement';
import {Subscription} from 'rxjs';

const SERVER_UNAVAILABLE_MESSAGE = `server is unavailable;
  waiting for retry  `
const UNKNOWN_ERROR_MESSAGE = `unknown error; contact the application staff courses.admin@tel-ran.com`

const App: React.FC = () => {
    const dispatch = useDispatch();
    const [flAlert, setAlert] = React.useState(false);
    const [flUnknown, setFlUnknown] = React.useState(false);
    const alertMessage = React.useRef('');

    const operationCode: OperationCode = useSelector<StateType, OperationCode>(state => state.operationCode);
    useEffect(() => {
        const subscription = getData(dispatch);
        return () => subscription.unsubscribe();
    }, [])

    const [flNavigate, setFlNavigate] = React.useState<boolean>(true);
    const relevantItems: RouteType[] = React.useMemo<RouteType[]>(() => ROUTES, []);
    React.useEffect(() => setFlNavigate(false), [])

    function operationCodeHandler() {
        console.log("operation code", operationCode)
        if (operationCode === OperationCode.SERVER_UNAVAILABLE) {
            setAlert(true);
            setFlUnknown(false);
            alertMessage.current = SERVER_UNAVAILABLE_MESSAGE;
        } else if (operationCode === OperationCode.UNKNOWN) {
            setAlert(true);
            setFlUnknown(true);
            alertMessage.current = UNKNOWN_ERROR_MESSAGE;
        } else {
            setAlert(false);
        }
    }

    const operationCodeCallback = React.useCallback(operationCodeHandler, []);
    React.useEffect(() => {
        operationCodeCallback();
    }, [operationCodeCallback])

    return <Box>{flAlert ?
        <Box>
            <Alert severity='error'>
                {alertMessage.current}
            </Alert>
            {!flUnknown && <LinearProgress/>}
        </Box> : <BrowserRouter>
            <Navigator items={relevantItems}/>
            {flNavigate && (<Navigate to={ADS_PATH}></Navigate>)}
            <Routes>
                {getRoutes(relevantItems)}
            </Routes>
        </BrowserRouter>}
    </Box>
}

export default App;

function getData(dispatch: any): Subscription {
    return adService.getObservableData().subscribe({
        next: courses_err => {
            if (Array.isArray(courses_err)) {
                dispatch(setAds(courses_err as Advertisement[]));
                dispatch(setOperationCode(OperationCode.OK));
            } else {
                console.log("getting operation code", courses_err)
                dispatch(setOperationCode(courses_err as OperationCode))
            }
        }
    })
}

function getRoutes(relevantItems: RouteType[]): React.ReactNode {
    return relevantItems.map(r => <Route key={r.path} path={r.path} element={r.element}/>)
}
