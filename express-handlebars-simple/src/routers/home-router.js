import express from 'express';


const homeHandler = async (req, res, next) => {
    try {
        res.render('home', {message : "Salam perdamaian !!"});
    } catch (error) {
        next(error);
    }
}


/**
 * Create instance of Express.Router
 */
const router = express.Router();

router.get('/', homeHandler);

export default router;