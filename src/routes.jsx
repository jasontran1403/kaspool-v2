import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useParams, useRoutes } from 'react-router-dom';

import Pyramid from "./pages/Pyramid";


export default function Router() {
    const routes = useRoutes([
        {
            path: "/*",
            element: <Pyramid />
        },
    ]);

    return routes;
}
