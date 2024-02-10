import { Router, Request, Response } from 'express';
import moment from 'moment';

const router = Router();

// Index page.
router.get('/', (req: Request, res: Response) => {
    res.render("pages/index", {
        moment: moment
    });
});

// Demo page.
router.get('/test', (req: Request, res: Response) => {
    res.send("Hello, World!");
});

export default router;
