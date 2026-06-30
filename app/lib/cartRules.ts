import { CartItem } from "../Redux/slices/cart/cartSlice";

export const WEIGHT_LOSS_PROGRAM_PRODUCT_ID =
  "d6852ae2-0d52-4cc1-8cf9-9ba7eaef0848";

type CartGuardResult = {
  allowed: boolean;
  message?: string;
};

export const canAddProductWithCartRules = (
  cartItems: CartItem[],
  productId: string,
): CartGuardResult => {
  const hasWeightLossProgram = cartItems.some(
    (item) => item.productId === WEIGHT_LOSS_PROGRAM_PRODUCT_ID,
  );
  const hasNonWeightLossProducts = cartItems.some(
    (item) => item.productId !== WEIGHT_LOSS_PROGRAM_PRODUCT_ID,
  );
  const isWeightLossProgram = productId === WEIGHT_LOSS_PROGRAM_PRODUCT_ID;

  if (isWeightLossProgram && hasNonWeightLossProducts) {
    return {
      allowed: false,
      message:
        "You can't add the Weight Loss Program while other products are already in your cart.",
    };
  }

  if (!isWeightLossProgram && hasWeightLossProgram) {
    return {
      allowed: false,
      message:
        "You can't add other products while the Weight Loss Program is in your cart.",
    };
  }

  return { allowed: true };
};
