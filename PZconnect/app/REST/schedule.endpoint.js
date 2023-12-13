import business from '../business/business.container';

const scheduleEndpoint = (router) => {
    router.put('/api/Schedule/update/:id', async (req, res) => {
        try {
            const scheduleEntry = await business.getScheduleManager(req).update(req.body,req.params.id);
            if (scheduleEntry) {
                res.status(201).json(scheduleEntry);
            } else {
                res.status(500).json({ error: 'Error creating schedule entry 1' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error creating schedule entry' });
        }
    });
    router.put('/api/deleteSchedule/:id', async (req, res) => {
        try {

            const scheduleEntry = await business.getScheduleManager(req).remove(req.params.id);
            if (scheduleEntry) {
                res.status(201).json(scheduleEntry);
            } else {
                res.status(500).json({ error: 'Error creating schedule entry 1' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error creating schedule entry' });
        }
    });
    router.get('/api/schedule/byId/:Id', async (req, res,next) => {
        try {
            const schedule = await business.getScheduleManager(req).get(req.params.Id);
            console.log(schedule);
            res.status(200).json(schedule);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching schedule' });
        }

    });
    router.get('/api/schedule/by-owner/:ownerId', async (req, res) => {
        const ownerId = req.params.ownerId;
        console.log(req.params.ownerId);
        try {
            const schedule = await business.getScheduleManager(req).findByOwner(ownerId);
            console.log(schedule);
            res.status(200).json(schedule);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching schedule' });
        }

    });
    router.get('/api/schedule/by-owner/amount/:ownerId', async (req, res) => {
        const ownerId = req.params.ownerId;
        console.log(req.params.ownerId);
        try {
            const schedule = await business.getScheduleManager(req).findByOwner(ownerId);
            console.log(schedule.length);
            res.status(200).json(schedule.length);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching schedule' });
        }
    });

    router.get('/api/schedules', async (req, res, next) => {

        try {
            const schedule = await business.getScheduleManager().query();
            console.log(schedule);
            res.status(200).send(schedule);
        } catch (error) {
            res.status(500).send({ error: 'Error fetching schedule' });
        }
    });

    router.post('/api/createSchedule', async (req, res, next) => {
        try {


            const scheduleEntry = await business.getScheduleManager().createNew(req.body);

            if (scheduleEntry) {
                res.status(201).json(scheduleEntry);
            } else {
                res.status(500).json({ error: 'Error creating schedule entry 1' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error creating schedule entry' });
        }
    });
};
export default scheduleEndpoint;
