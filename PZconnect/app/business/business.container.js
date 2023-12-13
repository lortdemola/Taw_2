import userManager from './user.manager';
import scheduleManager from "./schedule.manager";



function getter(manager, request) {
    return function () {
        return manager.create(request, this);
    };
}

export default {
    getUserManager: getter(userManager),
    getScheduleManager: getter(scheduleManager),

};
