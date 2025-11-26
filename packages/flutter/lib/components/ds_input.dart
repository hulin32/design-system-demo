import 'package:flutter/material.dart';
import '../tokens/tokens.dart';

/// Input size types matching the web component API
enum DsInputSize {
  sm,
  md,
  lg,
}

/// A customizable text input component that matches the web design system
class DsInput extends StatelessWidget {
  /// The text editing controller
  final TextEditingController? controller;

  /// The callback when the input value changes
  final ValueChanged<String>? onChanged;

  /// The callback when editing is complete
  final VoidCallback? onEditingComplete;

  /// The callback when the input is submitted
  final ValueChanged<String>? onSubmitted;

  /// The input label
  final String? label;

  /// The input placeholder
  final String? placeholder;

  /// Helper text displayed below the input
  final String? helper;

  /// Error message displayed below the input
  final String? error;

  /// The input size
  final DsInputSize size;

  /// Whether the input is disabled
  final bool disabled;

  /// Whether the input is required
  final bool required;

  /// Whether the input is read-only
  final bool readOnly;

  /// Whether to obscure the text (for passwords)
  final bool obscureText;

  /// The keyboard type
  final TextInputType? keyboardType;

  /// The text input action
  final TextInputAction? textInputAction;

  /// Maximum number of lines
  final int? maxLines;

  /// Minimum number of lines
  final int? minLines;

  /// Maximum length of input
  final int? maxLength;

  /// Prefix widget
  final Widget? prefix;

  /// Suffix widget
  final Widget? suffix;

  /// Focus node
  final FocusNode? focusNode;

  /// Auto-focus
  final bool autofocus;

  const DsInput({
    super.key,
    this.controller,
    this.onChanged,
    this.onEditingComplete,
    this.onSubmitted,
    this.label,
    this.placeholder,
    this.helper,
    this.error,
    this.size = DsInputSize.md,
    this.disabled = false,
    this.required = false,
    this.readOnly = false,
    this.obscureText = false,
    this.keyboardType,
    this.textInputAction,
    this.maxLines = 1,
    this.minLines,
    this.maxLength,
    this.prefix,
    this.suffix,
    this.focusNode,
    this.autofocus = false,
  });

  @override
  Widget build(BuildContext context) {
    final hasError = error != null && error!.isNotEmpty;
    final contentPadding = _getContentPadding();
    final textStyle = _getTextStyle();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (label != null) ...[
          Row(
            children: [
              Text(
                label!,
                style: TextStyle(
                  fontSize: DsTypography.fontSizeSm,
                  fontWeight: DsTypography.fontWeightMedium,
                  color: DsColors.neutral700,
                ),
              ),
              if (required)
                Text(
                  ' *',
                  style: TextStyle(
                    fontSize: DsTypography.fontSizeSm,
                    color: DsColors.error500,
                  ),
                ),
            ],
          ),
          SizedBox(height: DsSpacing.space1),
        ],
        TextField(
          controller: controller,
          onChanged: onChanged,
          onEditingComplete: onEditingComplete,
          onSubmitted: onSubmitted,
          enabled: !disabled,
          readOnly: readOnly,
          obscureText: obscureText,
          keyboardType: keyboardType,
          textInputAction: textInputAction,
          maxLines: maxLines,
          minLines: minLines,
          maxLength: maxLength,
          focusNode: focusNode,
          autofocus: autofocus,
          style: textStyle.copyWith(
            color: disabled ? DsColors.neutral400 : DsColors.text,
          ),
          decoration: InputDecoration(
            hintText: placeholder,
            hintStyle: textStyle.copyWith(color: DsColors.textMuted),
            contentPadding: contentPadding,
            filled: true,
            fillColor: disabled ? DsColors.neutral100 : DsColors.surface,
            prefixIcon: prefix != null
                ? Padding(
                    padding: EdgeInsets.only(left: DsSpacing.space3),
                    child: prefix,
                  )
                : null,
            prefixIconConstraints: BoxConstraints(
              minWidth: 40,
              minHeight: 0,
            ),
            suffixIcon: suffix != null
                ? Padding(
                    padding: EdgeInsets.only(right: DsSpacing.space3),
                    child: suffix,
                  )
                : null,
            suffixIconConstraints: BoxConstraints(
              minWidth: 40,
              minHeight: 0,
            ),
            border: OutlineInputBorder(
              borderRadius: DsBorderRadius.mdAll,
              borderSide: BorderSide(color: DsColors.border),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: DsBorderRadius.mdAll,
              borderSide: BorderSide(
                color: hasError ? DsColors.error500 : DsColors.border,
              ),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: DsBorderRadius.mdAll,
              borderSide: BorderSide(
                color: hasError ? DsColors.error500 : DsColors.primary500,
                width: 2,
              ),
            ),
            disabledBorder: OutlineInputBorder(
              borderRadius: DsBorderRadius.mdAll,
              borderSide: BorderSide(color: DsColors.neutral200),
            ),
            errorBorder: OutlineInputBorder(
              borderRadius: DsBorderRadius.mdAll,
              borderSide: BorderSide(color: DsColors.error500),
            ),
            focusedErrorBorder: OutlineInputBorder(
              borderRadius: DsBorderRadius.mdAll,
              borderSide: BorderSide(color: DsColors.error500, width: 2),
            ),
          ),
        ),
        if (error != null || helper != null) ...[
          SizedBox(height: DsSpacing.space1),
          Text(
            error ?? helper ?? '',
            style: TextStyle(
              fontSize: DsTypography.fontSizeXs,
              color: hasError ? DsColors.error500 : DsColors.textMuted,
            ),
          ),
        ],
      ],
    );
  }

  EdgeInsets _getContentPadding() {
    switch (size) {
      case DsInputSize.sm:
        return EdgeInsets.symmetric(
          horizontal: DsSpacing.space2,
          vertical: DsSpacing.space1,
        );
      case DsInputSize.md:
        return EdgeInsets.symmetric(
          horizontal: DsSpacing.space3,
          vertical: DsSpacing.space2,
        );
      case DsInputSize.lg:
        return EdgeInsets.symmetric(
          horizontal: DsSpacing.space4,
          vertical: DsSpacing.space3,
        );
    }
  }

  TextStyle _getTextStyle() {
    switch (size) {
      case DsInputSize.sm:
        return TextStyle(fontSize: DsTypography.fontSizeSm);
      case DsInputSize.md:
        return TextStyle(fontSize: DsTypography.fontSizeBase);
      case DsInputSize.lg:
        return TextStyle(fontSize: DsTypography.fontSizeLg);
    }
  }
}

