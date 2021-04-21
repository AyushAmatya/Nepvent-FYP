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
    linkImageAndEventController,
    getMyEventsController,
    getImageListController,
    getEventDteailsController,
    getEventPurposeController,
    getEventCoordinationController,
    getEventImagesController,
    getAllOtherEventsController,
    getMaxTicketIdController,
    addTicketsEventController,
    getEnrolledController,
    getMyTicketsController
} = require('../controllers/event.controller.js')

router.post('/add', addEventController);
router.get('/getMaxId', getMaxIdController);
router.post('/uploadImage', store.array('image'), uploadImageController);
router.post('/linkImageAndEvent', linkImageAndEventController);
router.post('/getMyEvents', getMyEventsController);
router.post('/getImageList', getImageListController);
router.post('/getEventDteails', getEventDteailsController);
router.post('/getEventPurpose', getEventPurposeController);
router.post('/getEventCoordination', getEventCoordinationController);
router.post('/getEventImages', getEventImagesController);
router.post('/getAllOtherEvents', getAllOtherEventsController);
router.get('/getMaxTicketId', getMaxTicketIdController);
router.post('/addTickets', addTicketsEventController);
router.post('/getEnrolled', getEnrolledController);
router.post('/getMyTickets', getMyTicketsController);
module.exports = router;