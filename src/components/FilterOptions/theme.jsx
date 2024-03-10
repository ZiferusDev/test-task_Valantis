const theme = (colors) => (
  {
    token: {
      colorBorder: 'transparent',
      colorPrimaryBorderHover: 'transparent',

      fontFamily: 'Circe',
      colorBgContainer: colors.primary,
      colorText: colors.tertiary,

      colorBgElevated: colors.primary,
      controlItemBgHover: colors.secondary,
    },
    components: {
      Select: {
        // Не нашёл, как исправить:
        // В "empty description" текст должен быть белым, но остаётся чёрным
        selectorBg: colors.primary,
        multipleItemBg: colors.secondary,
        clearBg: colors.primary,
        colorTextDescription: colors.tertiary,
        colorTextPlaceholder: colors.tertiary,
        colorTextQuaternary: colors.tertiary, // Стрелка, ClearButton
        colorTextDisabled: colors.tertiary,

        colorPrimaryHover: 'transparent',
        controlOutline: colors.secondary,
      },
    },
  }
);

export default theme;
