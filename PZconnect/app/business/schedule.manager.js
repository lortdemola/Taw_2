import scheduleDAO from "../DAO/scheduleDAO";

function create(context) {
    async function query() {
        let result = scheduleDAO.query();
        if (result) {
            return result;
        }
    }

    async function get(id) {
        let result = await scheduleDAO.get(id);
        if (result) {
            return result;
        }
    }
    async function findByOwner(ownerId) {
        const result = await scheduleDAO.findByOwner(ownerId);
        if (result) {
            return result;
        }
    }
    async function createNew(data) {
        let result = await scheduleDAO.createNew(data);
        if (result) {
            return result;
        }
    }
    async function update(data,id) {
        let result = await scheduleDAO.update(data,id);
        if (result) {
            return result;
        }
    }
    async function remove(id) {
        let result = await scheduleDAO.remove(id);
        if (result) {
            return result;
        }
    }
    return {
        query: query,
        get: get,
        createNew: createNew,
        update: update,
        remove:remove,
        findByOwner: findByOwner,
    };
}

export default {
    create: create
};
