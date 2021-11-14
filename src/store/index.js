import { createStore } from "vuex";

export default createStore({
    state: {
        cards: [],
    },
    mutations: {
        setCards(state, fetchedDcards) {
            state.cards.push(fetchedDcards);
        }
    }
});
