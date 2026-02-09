import 'package:flutter/material.dart';

class ProposalsScreen extends StatelessWidget {
  const ProposalsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: Text(
            'Manage Orders',
            style: TextStyle(
              color:
                  theme.appBarTheme.titleTextStyle?.color ??
                  (isDark ? Colors.white : const Color(0xFF111827)),
              fontWeight: FontWeight.bold,
            ),
          ),
          backgroundColor: theme.appBarTheme.backgroundColor,
          elevation: 0,
          centerTitle: false,
          bottom: const TabBar(
            labelColor: Color(0xFFFFD021),
            unselectedLabelColor: Color(0xFF6B7280),
            indicatorColor: Color(0xFFFFD021),
            tabs: [
              Tab(text: 'Active'),
              Tab(text: 'Completed'),
            ],
          ),
        ),
        backgroundColor: theme.scaffoldBackgroundColor,
        body: TabBarView(
          children: [
            _buildActiveOrders(context),
            _buildCompletedOrders(context),
          ],
        ),
      ),
    );
  }

  Widget _buildActiveOrders(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        _buildOrderItem(
          context,
          'Logo Design for Tech Startup',
          'In Progress',
          '\$250.00',
          Colors.blue,
          'Due in 2 days',
        ),
        _buildOrderItem(
          context,
          'Mobile App UI/UX',
          'Revision Requested',
          '\$1,200.00',
          Colors.orange,
          'Waiting for client',
        ),
      ],
    );
  }

  Widget _buildCompletedOrders(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        _buildOrderItem(
          context,
          'SEO Optimization',
          'Completed',
          '\$450.00',
          Colors.green,
          'Delivered on Oct 24',
        ),
        _buildOrderItem(
          context,
          'Blog Content Writing',
          'Completed',
          '\$120.00',
          Colors.green,
          'Delivered on Oct 20',
        ),
      ],
    );
  }

  Widget _buildOrderItem(
    BuildContext context,
    String title,
    String status,
    String price,
    Color statusColor,
    String date,
  ) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF1F2937) : Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: isDark ? Colors.white10 : Colors.grey.withOpacity(0.1),
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.02),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: statusColor.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Text(
                  status,
                  style: TextStyle(
                    color: statusColor,
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              Text(
                price,
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                  color: isDark ? Colors.white : const Color(0xFF111827),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            title,
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: isDark ? Colors.white : const Color(0xFF111827),
            ),
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              Icon(
                Icons.calendar_today,
                size: 14,
                color: isDark ? Colors.grey[500] : const Color(0xFF9CA3AF),
              ),
              const SizedBox(width: 4),
              Text(
                date,
                style: TextStyle(
                  fontSize: 12,
                  color: isDark ? Colors.grey[400] : const Color(0xFF6B7280),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
