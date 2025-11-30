type Props = {
  meal: "breakfast" | "lunch" | "dinner" | "others";
};

export const MealCell = ({ meal }: Props) => {
  const mealMap = {
    breakfast: {
      label: "CAFÉ DA MANHÃ",
      colorBg: "bg-[#2E8B57] bg-opacity-15",
      colorText: "text-[#2E8B57]",
    },
    lunch: {
      label: "ALMOÇO",
      colorBg: "bg-[#FFA500] bg-opacity-15",
      colorText: "text-[#FFA500]",
    },
    dinner: {
      label: "JANTAR",
      colorBg: "bg-[#C43535] bg-opacity-15",
      colorText: "text-[#C43535]",
    },
    others: {
      label: "OUTROS",
      colorBg: "bg-[#808080] bg-opacity-15",
      colorText: "text-[#808080]",
    },
  };

  if (meal in mealMap) {
    const { label, colorBg, colorText } = mealMap[meal as keyof typeof mealMap];
    return (
      <span
        className={`px-2 py-1 rounded-[2px] ${colorBg} ${colorText} leading-[18px] font-bold text-[10px]`}
      >
        {label}
      </span>
    );
  }
};
