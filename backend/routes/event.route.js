const router = require('express').Router();
const store = require('../middleware/multer')

// validation 
// const {
//     validAddEvent
// } = require('../helpers/valid')
  
//load controllers
const{
    addEventController,
    getMaxIdController,
    uploadImageController,
    linkImageAndEventController
} = require('../controllers/event.controller.js')

router.post('/add', addEventController);
router.get('/getMaxId', getMaxIdController);
router.post('/uploadImage', store.array('image'), uploadImageController);
router.post('/linkImageAndEvent', linkImageAndEventController);


module.exports = router;