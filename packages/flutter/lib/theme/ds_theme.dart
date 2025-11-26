import 'package:flutter/material.dart';
import 'ds_theme_data.dart';

/// A widget that provides the design system theme to its descendants
class DsTheme extends StatelessWidget {
  /// The widget below this widget in the tree
  final Widget child;

  /// The theme mode (light, dark, or system)
  final ThemeMode themeMode;

  const DsTheme({
    super.key,
    required this.child,
    this.themeMode = ThemeMode.system,
  });

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: DsThemeData.light(),
      darkTheme: DsThemeData.dark(),
      themeMode: themeMode,
      home: child,
    );
  }
}

/// Extension on BuildContext to easily access design system theme values
extension DsThemeExtension on BuildContext {
  /// Get the current theme data
  ThemeData get dsTheme => Theme.of(this);

  /// Get the current color scheme
  ColorScheme get dsColors => Theme.of(this).colorScheme;

  /// Get the current text theme
  TextTheme get dsTextTheme => Theme.of(this).textTheme;

  /// Check if the current theme is dark
  bool get isDarkMode => Theme.of(this).brightness == Brightness.dark;
}

