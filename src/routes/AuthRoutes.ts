import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { userEmailIsUnique, userNameIsUnique, userPasswordIsValid } from '../validators/AuthValidation';
import { SignIn, SignOut, SignUp } from '../controllers/AuthControllers';

const router = Router();

// Signup page.
router.get('/signup', (req: Request, res: Response) => {
    res.render("pages/auth/signup");
});

// Signup page.
router.get('/signin', (req: Request, res: Response) => {
    res.render("pages/auth/signin");
});


// Signup post.
router.post("/signup", 
    body('email').isEmail().normalizeEmail().custom(userEmailIsUnique),
    body('username').not().isEmpty().trim().escape().custom(userNameIsUnique),
    body('password').custom(userPasswordIsValid),
    SignUp
);

// Signup in.
router.post("/signin", 
    body('username').not().isEmpty().trim().escape(),
    body('password').custom(userPasswordIsValid),
    SignIn
);

// Sign out.
router.post("/signout",
    SignOut
);

export default router;
