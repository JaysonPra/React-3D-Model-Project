const initialData = {
  count: 0,
};

const counterReducer = (state = initialData, action) => {
  switch (action.type) {
    case "INCREASE":
      return { count: ++state.count };

    case "DECREASE":
      return { count: --state.count };

    case "RESET":
      return { count: 0 };

    default:
      return state;
  }
};

export default counterReducer;
