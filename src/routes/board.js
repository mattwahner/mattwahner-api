import express from 'express';
import auth from "../middlewares/auth";
import Message from '../models/Message';

const router = express.Router();

let message = 'In room';

router.route('/')
    .get((req, res) => {
        res.json({ message });
    });

router.use(auth);

router.route('/')
    .post((req, res) => {
        message = req.body.text;
        res.json({message: 'Location saved'});
    });

router.route('/messages')
    .get((req, res) => {
        Message.find((error, messages) => {
            if (error)
                res.send(error);

            res.json(messages);
        })
    })
    .post((req, res) => {
        let message = new Message();
        message.text = req.body.text;

        message.save((error) => {
            if (error)
                res.send(error);

            res.json(message);
        });
    });

router.route('/messages/:message_id')
    .get((req, res) => {
        Message.findById(req.params.message_id, (error, message) => {
            if (error)
                res.send(error);

            res.json(message);
        })
    })
    .put((req, res) => {
        Message.findById(req.params.message_id, (error, message) => {
            if (error)
                res.send(error);

            message.text = req.body.text;

            message.save((error) => {
                if (error)
                    res.send(error);

                res.json(message);
            })
        })
    })
    .delete((req, res) => {
        Message.remove({
            _id: req.params.message_id
        }, (error, message) => {
            if (error)
                res.send(error);

            res.json(message);
        });
    });

export default router;