const initialData = {
  cart_items: [],
};

const cart_reducer = (state = initialData, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        cart_items: [...state.cart_items, action.payload],
      };

    case "REMOVE_FROM_CART":
      return {
        cart_items: state.cart_items.filter(
          (item) => item.id != action.payload
        ),
      };

    case "UPDATE_CART":
      return {
        cart_items: state.cart_items.map((item) => {
          return item.id == action.payload.id ? action.payload : item;
        }),
      };

    case "EMPTY_CART":
      return {
        cart_items: [],
      };

    default:
      return state;
  }
};

export default cart_reducer;
