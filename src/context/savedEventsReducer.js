import axios from 'axios';

const savedEventsReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_EVENTS':
      // When the action type is 'SET_EVENTS', update the state with the new events data
      return payload;
    case 'push':
      axios
        .post('http://localhost:5000/api/events', payload)
        .then((response) => {
          return [...state, response.data];
        })
        .catch((error) => {
          console.error('Error adding reservation:', error);
          // Return the existing state without any modifications on error
          return state;
        });

      return state;
    case 'update':
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case 'delete':
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
};

export default savedEventsReducer;
