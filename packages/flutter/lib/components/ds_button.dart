import 'package:flutter/material.dart';
import '../tokens/tokens.dart';

/// Button variant types matching the web component API
enum DsButtonVariant {
  primary,
  secondary,
  outline,
  ghost,
  destructive,
}

/// Button size types matching the web component API
enum DsButtonSize {
  sm,
  md,
  lg,
}

/// A customizable button component that matches the web design system
class DsButton extends StatelessWidget {
  /// The button label text
  final String label;

  /// The callback when the button is pressed
  final VoidCallback? onPressed;

  /// The button variant
  final DsButtonVariant variant;

  /// The button size
  final DsButtonSize size;

  /// Whether the button is in a loading state
  final bool loading;

  /// Whether the button should expand to fill its parent width
  final bool fullWidth;

  /// Optional icon to display before the label
  final IconData? prefixIcon;

  /// Optional icon to display after the label
  final IconData? suffixIcon;

  /// Optional child widget (alternative to label)
  final Widget? child;

  const DsButton({
    super.key,
    this.label = '',
    this.onPressed,
    this.variant = DsButtonVariant.primary,
    this.size = DsButtonSize.md,
    this.loading = false,
    this.fullWidth = false,
    this.prefixIcon,
    this.suffixIcon,
    this.child,
  });

  @override
  Widget build(BuildContext context) {
    final buttonChild = _buildChild();
    final buttonStyle = _getButtonStyle();

    Widget button;

    switch (variant) {
      case DsButtonVariant.primary:
      case DsButtonVariant.secondary:
      case DsButtonVariant.destructive:
        button = ElevatedButton(
          onPressed: loading ? null : onPressed,
          style: buttonStyle,
          child: buttonChild,
        );
        break;
      case DsButtonVariant.outline:
        button = OutlinedButton(
          onPressed: loading ? null : onPressed,
          style: buttonStyle,
          child: buttonChild,
        );
        break;
      case DsButtonVariant.ghost:
        button = TextButton(
          onPressed: loading ? null : onPressed,
          style: buttonStyle,
          child: buttonChild,
        );
        break;
    }

    if (fullWidth) {
      return SizedBox(width: double.infinity, child: button);
    }

    return button;
  }

  Widget _buildChild() {
    if (loading) {
      return SizedBox(
        width: _getIconSize(),
        height: _getIconSize(),
        child: CircularProgressIndicator(
          strokeWidth: 2,
          valueColor: AlwaysStoppedAnimation<Color>(_getLoadingColor()),
        ),
      );
    }

    final content = child ?? Text(label);

    if (prefixIcon == null && suffixIcon == null) {
      return content;
    }

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        if (prefixIcon != null) ...[
          Icon(prefixIcon, size: _getIconSize()),
          SizedBox(width: DsSpacing.space2),
        ],
        content,
        if (suffixIcon != null) ...[
          SizedBox(width: DsSpacing.space2),
          Icon(suffixIcon, size: _getIconSize()),
        ],
      ],
    );
  }

  ButtonStyle _getButtonStyle() {
    final padding = _getPadding();
    final minHeight = _getMinHeight();
    final textStyle = _getTextStyle();
    final borderRadius = DsBorderRadius.mdAll;

    switch (variant) {
      case DsButtonVariant.primary:
        return ElevatedButton.styleFrom(
          backgroundColor: DsColors.primary500,
          foregroundColor: Colors.white,
          padding: padding,
          minimumSize: Size(0, minHeight),
          textStyle: textStyle,
          shape: RoundedRectangleBorder(borderRadius: borderRadius),
          elevation: 0,
        ).copyWith(
          backgroundColor: WidgetStateProperty.resolveWith((states) {
            if (states.contains(WidgetState.disabled)) {
              return DsColors.primary500.withOpacity(0.5);
            }
            if (states.contains(WidgetState.pressed)) {
              return DsColors.primary700;
            }
            if (states.contains(WidgetState.hovered)) {
              return DsColors.primary600;
            }
            return DsColors.primary500;
          }),
        );

      case DsButtonVariant.secondary:
        return ElevatedButton.styleFrom(
          backgroundColor: DsColors.secondary500,
          foregroundColor: Colors.white,
          padding: padding,
          minimumSize: Size(0, minHeight),
          textStyle: textStyle,
          shape: RoundedRectangleBorder(borderRadius: borderRadius),
          elevation: 0,
        ).copyWith(
          backgroundColor: WidgetStateProperty.resolveWith((states) {
            if (states.contains(WidgetState.disabled)) {
              return DsColors.secondary500.withOpacity(0.5);
            }
            if (states.contains(WidgetState.pressed)) {
              return DsColors.secondary700;
            }
            if (states.contains(WidgetState.hovered)) {
              return DsColors.secondary600;
            }
            return DsColors.secondary500;
          }),
        );

      case DsButtonVariant.outline:
        return OutlinedButton.styleFrom(
          foregroundColor: DsColors.primary500,
          padding: padding,
          minimumSize: Size(0, minHeight),
          textStyle: textStyle,
          shape: RoundedRectangleBorder(borderRadius: borderRadius),
          side: BorderSide(color: DsColors.primary500, width: 2),
        ).copyWith(
          backgroundColor: WidgetStateProperty.resolveWith((states) {
            if (states.contains(WidgetState.pressed)) {
              return DsColors.primary100;
            }
            if (states.contains(WidgetState.hovered)) {
              return DsColors.primary50;
            }
            return Colors.transparent;
          }),
        );

      case DsButtonVariant.ghost:
        return TextButton.styleFrom(
          foregroundColor: DsColors.neutral700,
          padding: padding,
          minimumSize: Size(0, minHeight),
          textStyle: textStyle,
          shape: RoundedRectangleBorder(borderRadius: borderRadius),
        ).copyWith(
          backgroundColor: WidgetStateProperty.resolveWith((states) {
            if (states.contains(WidgetState.pressed)) {
              return DsColors.neutral200;
            }
            if (states.contains(WidgetState.hovered)) {
              return DsColors.neutral100;
            }
            return Colors.transparent;
          }),
        );

      case DsButtonVariant.destructive:
        return ElevatedButton.styleFrom(
          backgroundColor: DsColors.error500,
          foregroundColor: Colors.white,
          padding: padding,
          minimumSize: Size(0, minHeight),
          textStyle: textStyle,
          shape: RoundedRectangleBorder(borderRadius: borderRadius),
          elevation: 0,
        ).copyWith(
          backgroundColor: WidgetStateProperty.resolveWith((states) {
            if (states.contains(WidgetState.disabled)) {
              return DsColors.error500.withOpacity(0.5);
            }
            if (states.contains(WidgetState.pressed) ||
                states.contains(WidgetState.hovered)) {
              return DsColors.error700;
            }
            return DsColors.error500;
          }),
        );
    }
  }

  EdgeInsets _getPadding() {
    switch (size) {
      case DsButtonSize.sm:
        return EdgeInsets.symmetric(
          horizontal: DsSpacing.space3,
          vertical: DsSpacing.space1,
        );
      case DsButtonSize.md:
        return EdgeInsets.symmetric(
          horizontal: DsSpacing.space4,
          vertical: DsSpacing.space2,
        );
      case DsButtonSize.lg:
        return EdgeInsets.symmetric(
          horizontal: DsSpacing.space6,
          vertical: DsSpacing.space3,
        );
    }
  }

  double _getMinHeight() {
    switch (size) {
      case DsButtonSize.sm:
        return 32;
      case DsButtonSize.md:
        return 40;
      case DsButtonSize.lg:
        return 48;
    }
  }

  double _getIconSize() {
    switch (size) {
      case DsButtonSize.sm:
        return 16;
      case DsButtonSize.md:
        return 18;
      case DsButtonSize.lg:
        return 20;
    }
  }

  TextStyle _getTextStyle() {
    switch (size) {
      case DsButtonSize.sm:
        return TextStyle(
          fontSize: DsTypography.fontSizeSm,
          fontWeight: DsTypography.fontWeightMedium,
        );
      case DsButtonSize.md:
        return TextStyle(
          fontSize: DsTypography.fontSizeBase,
          fontWeight: DsTypography.fontWeightMedium,
        );
      case DsButtonSize.lg:
        return TextStyle(
          fontSize: DsTypography.fontSizeLg,
          fontWeight: DsTypography.fontWeightMedium,
        );
    }
  }

  Color _getLoadingColor() {
    switch (variant) {
      case DsButtonVariant.primary:
      case DsButtonVariant.secondary:
      case DsButtonVariant.destructive:
        return Colors.white;
      case DsButtonVariant.outline:
        return DsColors.primary500;
      case DsButtonVariant.ghost:
        return DsColors.neutral700;
    }
  }
}

