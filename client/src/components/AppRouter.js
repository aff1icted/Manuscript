import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { MAIN_ROUTE } from './utils/consts';
import { adminRoutes, authRoutes, publicRoutes } from '../routes';

const AppRouter = observer(() => {
    const { user } = useContext(Context)
    return (
        <Switch>
            {user.isAdmin && adminRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} component={Component} exact />
            )}
            {user.isAuth && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} component={Component} exact />
            )}
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} component={Component} exact />
            )}
            <Redirect to={MAIN_ROUTE} />
        </Switch>
    );
});

export default AppRouter;