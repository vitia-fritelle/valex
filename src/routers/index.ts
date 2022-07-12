import { Router } from "express";
import cardRouters from "./cardRouters";
import rechargeRouters from "./rechargeRouters";
import paymentRouters from "./paymentRouters";

const router = Router();

const routers = [
    {
        path: '/card',
        subRouter: cardRouters,
    },
    {
        path: '/recharge',
        subRouter: rechargeRouters,
    },
    {
        path: '/payment',
        subRouter: paymentRouters,
    },
];

routers.forEach(({ path, subRouter }) => router.use(path, subRouter));

export default router;



