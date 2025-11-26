import 'package:flutter/material.dart';
import '../tokens/tokens.dart';

/// Card variant types matching the web component API
enum DsCardVariant {
  elevated,
  outlined,
  filled,
}

/// Card padding types matching the web component API
enum DsCardPadding {
  none,
  sm,
  md,
  lg,
}

/// A card component for grouping content that matches the web design system
class DsCard extends StatelessWidget {
  /// The card content
  final Widget? child;

  /// The card header content
  final Widget? header;

  /// The card footer content
  final Widget? footer;

  /// The card variant
  final DsCardVariant variant;

  /// The card padding
  final DsCardPadding padding;

  /// Whether the card is interactive (tappable)
  final bool interactive;

  /// The callback when the card is tapped (only when interactive)
  final VoidCallback? onTap;

  const DsCard({
    super.key,
    this.child,
    this.header,
    this.footer,
    this.variant = DsCardVariant.elevated,
    this.padding = DsCardPadding.md,
    this.interactive = false,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final cardContent = Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (header != null) _buildHeader(),
        if (child != null) _buildContent(),
        if (footer != null) _buildFooter(),
      ],
    );

    final decoration = _getDecoration();

    Widget card = AnimatedContainer(
      duration: DsTransitions.normal,
      decoration: decoration,
      clipBehavior: Clip.antiAlias,
      child: cardContent,
    );

    if (interactive) {
      card = MouseRegion(
        cursor: SystemMouseCursors.click,
        child: GestureDetector(
          onTap: onTap,
          child: _InteractiveCard(
            decoration: decoration,
            child: cardContent,
          ),
        ),
      );
    }

    return card;
  }

  Widget _buildHeader() {
    return Container(
      padding: EdgeInsets.all(DsSpacing.space4),
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(color: DsColors.border),
        ),
      ),
      child: header,
    );
  }

  Widget _buildContent() {
    return Padding(
      padding: _getPadding(),
      child: child,
    );
  }

  Widget _buildFooter() {
    return Container(
      padding: EdgeInsets.all(DsSpacing.space4),
      decoration: BoxDecoration(
        color: DsColors.neutral50,
        border: Border(
          top: BorderSide(color: DsColors.border),
        ),
      ),
      child: footer,
    );
  }

  BoxDecoration _getDecoration() {
    switch (variant) {
      case DsCardVariant.elevated:
        return BoxDecoration(
          color: DsColors.surface,
          borderRadius: DsBorderRadius.lgAll,
          boxShadow: DsShadows.md,
        );
      case DsCardVariant.outlined:
        return BoxDecoration(
          color: DsColors.surface,
          borderRadius: DsBorderRadius.lgAll,
          border: Border.all(color: DsColors.border),
        );
      case DsCardVariant.filled:
        return BoxDecoration(
          color: DsColors.neutral50,
          borderRadius: DsBorderRadius.lgAll,
        );
    }
  }

  EdgeInsets _getPadding() {
    switch (padding) {
      case DsCardPadding.none:
        return EdgeInsets.zero;
      case DsCardPadding.sm:
        return EdgeInsets.all(DsSpacing.space3);
      case DsCardPadding.md:
        return EdgeInsets.all(DsSpacing.space4);
      case DsCardPadding.lg:
        return EdgeInsets.all(DsSpacing.space6);
    }
  }
}

/// Internal widget for interactive card hover/press effects
class _InteractiveCard extends StatefulWidget {
  final BoxDecoration decoration;
  final Widget child;

  const _InteractiveCard({
    required this.decoration,
    required this.child,
  });

  @override
  State<_InteractiveCard> createState() => _InteractiveCardState();
}

class _InteractiveCardState extends State<_InteractiveCard> {
  bool _isHovered = false;
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    double translateY = 0;
    List<BoxShadow>? shadows = widget.decoration.boxShadow;

    if (_isPressed) {
      translateY = 0;
      shadows = DsShadows.md;
    } else if (_isHovered) {
      translateY = -2;
      shadows = DsShadows.lg;
    }

    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: GestureDetector(
        onTapDown: (_) => setState(() => _isPressed = true),
        onTapUp: (_) => setState(() => _isPressed = false),
        onTapCancel: () => setState(() => _isPressed = false),
        child: AnimatedContainer(
          duration: DsTransitions.fast,
          transform: Matrix4.translationValues(0, translateY, 0),
          decoration: widget.decoration.copyWith(boxShadow: shadows),
          clipBehavior: Clip.antiAlias,
          child: widget.child,
        ),
      ),
    );
  }
}

