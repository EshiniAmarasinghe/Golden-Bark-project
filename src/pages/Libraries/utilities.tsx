// Currency format
const CURRENCY = import.meta.env.VITE_DEFAULT_CURRENCY || "LKR";
const EXCHANGE_RATE = 300; 

console.log("ssss :", import.meta.env.VITE_DEFAULT_CURRENCY);
export const formatPrice = (amount: number): string => {
      let finalAmount = amount;

 if (CURRENCY === "LKR") {
    finalAmount = amount * EXCHANGE_RATE;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: CURRENCY,
    minimumFractionDigits: CURRENCY === "LKR" ? 0 : 2, 
  }).format(finalAmount);
};

//password

export function isValidPassword(password: string) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  return regex.test(password);
}
