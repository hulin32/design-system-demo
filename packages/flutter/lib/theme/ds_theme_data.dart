import 'package:flutter/material.dart';
import '../tokens/tokens.dart';

/// Design system theme data
class DsThemeData {
  /// Creates a light theme based on the design system tokens
  static ThemeData light() {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      colorScheme: ColorScheme.light(
        primary: DsColors.primary500,
        onPrimary: Colors.white,
        primaryContainer: DsColors.primary100,
        onPrimaryContainer: DsColors.primary900,
        secondary: DsColors.secondary500,
        onSecondary: Colors.white,
        secondaryContainer: DsColors.secondary100,
        onSecondaryContainer: DsColors.secondary900,
        surface: DsColors.surface,
        onSurface: DsColors.text,
        error: DsColors.error500,
        onError: Colors.white,
        outline: DsColors.border,
      ),
      scaffoldBackgroundColor: DsColors.background,
      fontFamily: DsTypography.fontFamilySans,
      textTheme: _buildTextTheme(),
      elevatedButtonTheme: _elevatedButtonTheme(),
      outlinedButtonTheme: _outlinedButtonTheme(),
      textButtonTheme: _textButtonTheme(),
      inputDecorationTheme: _inputDecorationTheme(),
      cardTheme: _cardTheme(),
    );
  }

  /// Creates a dark theme based on the design system tokens
  static ThemeData dark() {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      colorScheme: ColorScheme.dark(
        primary: DsColors.primary400,
        onPrimary: DsColors.primary900,
        primaryContainer: DsColors.primary700,
        onPrimaryContainer: DsColors.primary100,
        secondary: DsColors.secondary400,
        onSecondary: DsColors.secondary900,
        secondaryContainer: DsColors.secondary700,
        onSecondaryContainer: DsColors.secondary100,
        surface: DsColors.neutral800,
        onSurface: DsColors.neutral100,
        error: DsColors.error500,
        onError: Colors.white,
        outline: DsColors.neutral600,
      ),
      scaffoldBackgroundColor: DsColors.neutral900,
      fontFamily: DsTypography.fontFamilySans,
      textTheme: _buildTextTheme(isDark: true),
      elevatedButtonTheme: _elevatedButtonTheme(),
      outlinedButtonTheme: _outlinedButtonTheme(),
      textButtonTheme: _textButtonTheme(),
      inputDecorationTheme: _inputDecorationTheme(isDark: true),
      cardTheme: _cardTheme(isDark: true),
    );
  }

  static TextTheme _buildTextTheme({bool isDark = false}) {
    final textColor = isDark ? DsColors.neutral100 : DsColors.text;
    final mutedColor = isDark ? DsColors.neutral400 : DsColors.textMuted;

    return TextTheme(
      displayLarge: TextStyle(
        fontSize: DsTypography.fontSize5xl,
        fontWeight: DsTypography.fontWeightBold,
        height: DsTypography.lineHeightTight,
        color: textColor,
      ),
      displayMedium: TextStyle(
        fontSize: DsTypography.fontSize4xl,
        fontWeight: DsTypography.fontWeightBold,
        height: DsTypography.lineHeightTight,
        color: textColor,
      ),
      displaySmall: TextStyle(
        fontSize: DsTypography.fontSize3xl,
        fontWeight: DsTypography.fontWeightBold,
        height: DsTypography.lineHeightTight,
        color: textColor,
      ),
      headlineLarge: TextStyle(
        fontSize: DsTypography.fontSize2xl,
        fontWeight: DsTypography.fontWeightSemibold,
        height: DsTypography.lineHeightNormal,
        color: textColor,
      ),
      headlineMedium: TextStyle(
        fontSize: DsTypography.fontSizeXl,
        fontWeight: DsTypography.fontWeightSemibold,
        height: DsTypography.lineHeightNormal,
        color: textColor,
      ),
      headlineSmall: TextStyle(
        fontSize: DsTypography.fontSizeLg,
        fontWeight: DsTypography.fontWeightSemibold,
        height: DsTypography.lineHeightNormal,
        color: textColor,
      ),
      titleLarge: TextStyle(
        fontSize: DsTypography.fontSizeLg,
        fontWeight: DsTypography.fontWeightMedium,
        height: DsTypography.lineHeightNormal,
        color: textColor,
      ),
      titleMedium: TextStyle(
        fontSize: DsTypography.fontSizeBase,
        fontWeight: DsTypography.fontWeightMedium,
        height: DsTypography.lineHeightNormal,
        color: textColor,
      ),
      titleSmall: TextStyle(
        fontSize: DsTypography.fontSizeSm,
        fontWeight: DsTypography.fontWeightMedium,
        height: DsTypography.lineHeightNormal,
        color: textColor,
      ),
      bodyLarge: TextStyle(
        fontSize: DsTypography.fontSizeBase,
        fontWeight: DsTypography.fontWeightNormal,
        height: DsTypography.lineHeightRelaxed,
        color: textColor,
      ),
      bodyMedium: TextStyle(
        fontSize: DsTypography.fontSizeSm,
        fontWeight: DsTypography.fontWeightNormal,
        height: DsTypography.lineHeightRelaxed,
        color: textColor,
      ),
      bodySmall: TextStyle(
        fontSize: DsTypography.fontSizeXs,
        fontWeight: DsTypography.fontWeightNormal,
        height: DsTypography.lineHeightRelaxed,
        color: mutedColor,
      ),
      labelLarge: TextStyle(
        fontSize: DsTypography.fontSizeSm,
        fontWeight: DsTypography.fontWeightMedium,
        height: DsTypography.lineHeightNormal,
        color: textColor,
      ),
      labelMedium: TextStyle(
        fontSize: DsTypography.fontSizeXs,
        fontWeight: DsTypography.fontWeightMedium,
        height: DsTypography.lineHeightNormal,
        color: textColor,
      ),
      labelSmall: TextStyle(
        fontSize: DsTypography.fontSizeXs,
        fontWeight: DsTypography.fontWeightNormal,
        height: DsTypography.lineHeightNormal,
        color: mutedColor,
      ),
    );
  }

  static ElevatedButtonThemeData _elevatedButtonTheme() {
    return ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        padding: EdgeInsets.symmetric(
          horizontal: DsSpacing.space4,
          vertical: DsSpacing.space2,
        ),
        shape: RoundedRectangleBorder(
          borderRadius: DsBorderRadius.mdAll,
        ),
        textStyle: TextStyle(
          fontSize: DsTypography.fontSizeBase,
          fontWeight: DsTypography.fontWeightMedium,
        ),
      ),
    );
  }

  static OutlinedButtonThemeData _outlinedButtonTheme() {
    return OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        padding: EdgeInsets.symmetric(
          horizontal: DsSpacing.space4,
          vertical: DsSpacing.space2,
        ),
        shape: RoundedRectangleBorder(
          borderRadius: DsBorderRadius.mdAll,
        ),
        side: BorderSide(color: DsColors.primary500, width: 2),
        textStyle: TextStyle(
          fontSize: DsTypography.fontSizeBase,
          fontWeight: DsTypography.fontWeightMedium,
        ),
      ),
    );
  }

  static TextButtonThemeData _textButtonTheme() {
    return TextButtonThemeData(
      style: TextButton.styleFrom(
        padding: EdgeInsets.symmetric(
          horizontal: DsSpacing.space4,
          vertical: DsSpacing.space2,
        ),
        shape: RoundedRectangleBorder(
          borderRadius: DsBorderRadius.mdAll,
        ),
        textStyle: TextStyle(
          fontSize: DsTypography.fontSizeBase,
          fontWeight: DsTypography.fontWeightMedium,
        ),
      ),
    );
  }

  static InputDecorationTheme _inputDecorationTheme({bool isDark = false}) {
    final borderColor = isDark ? DsColors.neutral600 : DsColors.border;
    final fillColor = isDark ? DsColors.neutral800 : DsColors.surface;

    return InputDecorationTheme(
      filled: true,
      fillColor: fillColor,
      contentPadding: EdgeInsets.symmetric(
        horizontal: DsSpacing.space3,
        vertical: DsSpacing.space2,
      ),
      border: OutlineInputBorder(
        borderRadius: DsBorderRadius.mdAll,
        borderSide: BorderSide(color: borderColor),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: DsBorderRadius.mdAll,
        borderSide: BorderSide(color: borderColor),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: DsBorderRadius.mdAll,
        borderSide: BorderSide(color: DsColors.primary500, width: 2),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: DsBorderRadius.mdAll,
        borderSide: BorderSide(color: DsColors.error500),
      ),
      focusedErrorBorder: OutlineInputBorder(
        borderRadius: DsBorderRadius.mdAll,
        borderSide: BorderSide(color: DsColors.error500, width: 2),
      ),
    );
  }

  static CardTheme _cardTheme({bool isDark = false}) {
    return CardTheme(
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: DsBorderRadius.lgAll,
      ),
      color: isDark ? DsColors.neutral800 : DsColors.surface,
    );
  }
}

