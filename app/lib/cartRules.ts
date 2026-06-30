import { CartItem } from "../Redux/slices/cart/cartSlice";

export const WEIGHT_LOSS_PROGRAM_PRODUCT_ID =
  "d6852ae2-0d52-4cc1-8cf9-9ba7eaef0848";
export const HORMONE_PROGRAM_PRODUCT_ID =
  "bf59d40c-6813-402d-ac73-49a0e2f3565a";

const EXCLUSIVE_PROGRAM_PRODUCTS: Record<string, string> = {
  [WEIGHT_LOSS_PROGRAM_PRODUCT_ID]: "Weight Loss Program",
  [HORMONE_PROGRAM_PRODUCT_ID]: "Hormone Program",
};

type CartGuardResult = {
  allowed: boolean;
  message?: string;
};

export const canAddProductWithCartRules = (
  cartItems: CartItem[],
  productId: string,
): CartGuardResult => {
  const selectedExclusiveProgramName = EXCLUSIVE_PROGRAM_PRODUCTS[productId];
  const existingExclusiveProgram = cartItems.find(
    (item) => item.productId in EXCLUSIVE_PROGRAM_PRODUCTS,
  );
  const hasNonExclusiveProducts = cartItems.some(
    (item) => !(item.productId in EXCLUSIVE_PROGRAM_PRODUCTS),
  );

  if (selectedExclusiveProgramName && hasNonExclusiveProducts) {
    return {
      allowed: false,
      message:
        `You can't add the ${selectedExclusiveProgramName} while other products are already in your cart.`,
    };
  }

  if (
    selectedExclusiveProgramName &&
    existingExclusiveProgram &&
    existingExclusiveProgram.productId !== productId
  ) {
    return {
      allowed: false,
      message:
        `You can't add the ${selectedExclusiveProgramName} while the ${
          EXCLUSIVE_PROGRAM_PRODUCTS[existingExclusiveProgram.productId]
        } is already in your cart.`,
    };
  }

  if (!selectedExclusiveProgramName && existingExclusiveProgram) {
    return {
      allowed: false,
      message: `You can't add other products while the ${
        EXCLUSIVE_PROGRAM_PRODUCTS[existingExclusiveProgram.productId]
      } is in your cart.`,
    };
  }

  return { allowed: true };
};
