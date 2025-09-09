import cartReducer, {
  addItem,
  addMany,
  increaseItem,
  decreaseItem,
  deleteItem,
  clearCart,
} from "./cartSlice";

const samplePlant = {
  id: "test-1",
  name: "Test Plant",
  price: 10,
  category: "Test",
  thumbnail: "",
};

describe("cartSlice reducers", () => {
  it("handles addItem", () => {
    const state = cartReducer(undefined, addItem(samplePlant));
    expect(state.items[samplePlant.id].quantity).toBe(1);
    expect(state.totalQuantity).toBe(1);
    expect(state.totalPrice).toBe(10);
  });

  it("handles addMany with numeric and string quantity", () => {
    let state = cartReducer(
      undefined,
      addMany({ plant: samplePlant, quantity: 3 })
    );
    expect(state.items[samplePlant.id].quantity).toBe(3);
    expect(state.totalQuantity).toBe(3);
    expect(state.totalPrice).toBe(30);

    // adding with string quantity
    state = cartReducer(state, addMany({ plant: samplePlant, quantity: "2" }));
    expect(state.items[samplePlant.id].quantity).toBe(5);
    expect(state.totalQuantity).toBe(5);
    expect(state.totalPrice).toBe(50);
  });

  it("handles increaseItem and decreaseItem correctly", () => {
    let state = cartReducer(
      undefined,
      addMany({ plant: samplePlant, quantity: 2 })
    );
    state = cartReducer(state, increaseItem(samplePlant.id));
    expect(state.items[samplePlant.id].quantity).toBe(3);
    expect(state.totalQuantity).toBe(3);
    expect(state.totalPrice).toBe(30);

    // decrease until 1 (reducer does not reduce below 1)
    state = cartReducer(state, decreaseItem(samplePlant.id));
    expect(state.items[samplePlant.id].quantity).toBe(2);
    expect(state.totalQuantity).toBe(2);
    expect(state.totalPrice).toBe(20);

    state = cartReducer(state, decreaseItem(samplePlant.id));
    expect(state.items[samplePlant.id].quantity).toBe(1);
    expect(state.totalQuantity).toBe(1);
    expect(state.totalPrice).toBe(10);

    // attempting to decrease at quantity === 1 should not change
    state = cartReducer(state, decreaseItem(samplePlant.id));
    expect(state.items[samplePlant.id].quantity).toBe(1);
    expect(state.totalQuantity).toBe(1);
    expect(state.totalPrice).toBe(10);
  });

  it("handles deleteItem and clearCart", () => {
    let state = cartReducer(
      undefined,
      addMany({ plant: samplePlant, quantity: 4 })
    );
    state = cartReducer(state, deleteItem(samplePlant.id));
    expect(state.items[samplePlant.id]).toBeUndefined();
    expect(state.totalQuantity).toBe(0);
    expect(state.totalPrice).toBe(0);

    // clearCart
    state = cartReducer(undefined, addItem(samplePlant));
    state = cartReducer(state, clearCart());
    expect(Object.keys(state.items)).toHaveLength(0);
    expect(state.totalQuantity).toBe(0);
    expect(state.totalPrice).toBe(0);
  });
});
