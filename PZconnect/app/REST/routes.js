import userEndpoint from './user.endpoint';
import scheduleEndpoint from './schedule.endpoint';


const routes = function (router) {
    userEndpoint(router);
    scheduleEndpoint(router);

};

export default routes;
