export function createStore(rootReducer, initState = {}) {
    let state = rootReducer({...initState}, {type: '__INIT__'});
    let listeners = [];


    return {
        subscribe(fn) {
            listeners.push(fn);

            return {
                unsubscribe() {
                    listeners.filter(l => l !== fn)
                }
            }
        },
        dispatch(action) {
            state = rootReducer(state, action);
            listeners.forEach(l => l(state));
        },
        getState() {
            return JSON.parse(JSON.stringify(state));
        }
    }
}
