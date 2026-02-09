import 'package:flutter/material.dart';

class EarningsScreen extends StatelessWidget {
  const EarningsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textColor = isDark ? Colors.white : Colors.black;

    return Scaffold(
      appBar: AppBar(title: const Text('Earnings'), centerTitle: false),
      body: SingleChildScrollView(
        child: Column(
          children: [
            const SizedBox(height: 20),
            Text(
              '\$0',
              style: TextStyle(
                fontSize: 40,
                fontWeight: FontWeight.bold,
                color: Color(0xFFFFD021),
              ),
            ),
            Text(
              'Available for withdrawal',
              style: TextStyle(fontSize: 16, color: textColor),
            ),
            const SizedBox(height: 30),

            _buildSectionTitle(context, 'Analytics'),
            _buildAnalyticsItem(context, 'Earnings in February', '\$0'),
            _buildAnalyticsItem(context, 'Avg. selling price', '\$0'),
            _buildAnalyticsItem(context, 'Active orders', '0 (\$0)'),
            _buildAnalyticsItem(context, 'Available for withdrawal', '\$0'),
            _buildAnalyticsItem(context, 'Completed orders', '0 (\$0)'),

            const SizedBox(height: 30),
            _buildSectionTitle(context, 'Revenues'),
            _buildAnalyticsItem(
              context,
              'Payments being cleared',
              '\$0',
              showArrow: true,
            ),
            _buildAnalyticsItem(
              context,
              'Earnings to date',
              '\$0',
              showArrow: true,
            ),
            _buildAnalyticsItem(
              context,
              'Expenses to date',
              '\$0',
              showArrow: true,
            ),
            _buildAnalyticsItem(
              context,
              'Withdrawn to date',
              '\$0',
              showArrow: true,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionTitle(BuildContext context, String title) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Text(
        title,
        style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
      ),
    );
  }

  Widget _buildAnalyticsItem(
    BuildContext context,
    String title,
    String value, {
    bool showArrow = false,
  }) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textColor = isDark ? Colors.white : Colors.black;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: isDark ? Colors.white10 : Colors.grey[200]!,
          ),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(title, style: TextStyle(color: textColor, fontSize: 16)),
          Row(
            children: [
              Text(
                value,
                style: TextStyle(
                  color: textColor,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
              if (showArrow) ...[
                const SizedBox(width: 8),
                Icon(Icons.chevron_right, color: Colors.grey[400]),
              ],
            ],
          ),
        ],
      ),
    );
  }
}
