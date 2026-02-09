import 'package:flutter/material.dart';

class SellerPublicProfileScreen extends StatefulWidget {
  const SellerPublicProfileScreen({super.key});

  @override
  State<SellerPublicProfileScreen> createState() =>
      _SellerPublicProfileScreenState();
}

class _SellerPublicProfileScreenState extends State<SellerPublicProfileScreen> {
  bool _showFullAbout = false;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textColor = isDark ? Colors.white : Colors.black;
    final secondaryTextColor = isDark ? Colors.grey[400] : Colors.grey[600];

    const shortAboutText =
        'I develop custom web solutions for local businesses and independent startups, focusing on modern UI/UX and rapid...';
    const fullAboutText =
        'I develop custom web solutions for local businesses and independent startups, focusing on modern UI/UX, performance, and maintainability. From landing pages to full-stack applications, I help businesses create digital experiences that feel fast, modern, and delightful.';

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: textColor),
          onPressed: () => Navigator.of(context).pop(),
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.share, color: textColor),
            onPressed: () {},
          ),
          IconButton(
            icon: Icon(Icons.more_vert, color: textColor),
            onPressed: () {},
          ),
        ],
      ),
      body: DefaultTabController(
        length: 3,
        child: Column(
          children: [
            const SizedBox(height: 16),
            Center(
              child: Column(
                children: [
                  Stack(
                    children: [
                      CircleAvatar(
                        radius: 40,
                        backgroundColor:
                            isDark ? Colors.grey[800] : const Color(0xFFE5E7EB),
                        child: ClipOval(
                          child: Image.network(
                            'https://via.placeholder.com/150',
                            width: 80,
                            height: 80,
                            fit: BoxFit.cover,
                            errorBuilder: (context, error, stackTrace) {
                              return Icon(
                                Icons.person,
                                size: 40,
                                color: isDark
                                    ? Colors.grey[400]
                                    : const Color(0xFF9CA3AF),
                              );
                            },
                            loadingBuilder:
                                (context, child, loadingProgress) {
                              if (loadingProgress == null) {
                                return child;
                              }

                              final total =
                                  loadingProgress.expectedTotalBytes;
                              final value = (total != null && total > 0)
                                  ? loadingProgress.cumulativeBytesLoaded /
                                      total
                                  : null;

                              return Center(
                                child: CircularProgressIndicator(
                                  value: value,
                                  color: const Color(0xFFFFD021),
                                ),
                              );
                            },
                          ),
                        ),
                      ),
                      Positioned(
                        bottom: 0,
                        right: 0,
                        child: Container(
                          width: 16,
                          height: 16,
                          decoration: BoxDecoration(
                            color: const Color(
                              0xFFFFD021,
                            ), // Yellow online status
                            border: Border.all(
                              color: Theme.of(
                                context,
                              ).scaffoldBackgroundColor,
                              width: 2,
                            ),
                            shape: BoxShape.circle,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Rishav',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: textColor,
                    ),
                  ),
                  Text(
                    '@crrishav_',
                    style: TextStyle(
                      fontSize: 14,
                      color: secondaryTextColor,
                    ),
                  ),
                  const SizedBox(height: 20),
                ],
              ),
            ),
            TabBar(
              indicatorColor: const Color(0xFFFFD021),
              labelColor: textColor,
              unselectedLabelColor: secondaryTextColor,
              tabs: const [
                Tab(text: 'About'),
                Tab(text: 'Gigs'),
                Tab(text: 'Reviews'),
              ],
            ),
            Expanded(
              child: TabBarView(
                children: [
                  // About Tab
                  SingleChildScrollView(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'User information',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: textColor,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          _showFullAbout ? fullAboutText : shortAboutText,
                          style: TextStyle(color: textColor, height: 1.5),
                        ),
                        TextButton(
                          onPressed: () {
                            setState(() {
                              _showFullAbout = !_showFullAbout;
                            });
                          },
                          style: TextButton.styleFrom(
                            padding: EdgeInsets.zero,
                            minimumSize: const Size(0, 0),
                            tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                          ),
                          child: Text(
                            _showFullAbout ? 'less' : 'more',
                            style: const TextStyle(
                              fontWeight: FontWeight.bold,
                              decoration: TextDecoration.underline,
                            ),
                          ),
                        ),
                        const SizedBox(height: 24),
                        _buildInfoRow(
                          context,
                          Icons.location_on_outlined,
                          'From',
                          'Nepal (8:18 AM)',
                        ),
                        _buildInfoRow(
                          context,
                          Icons.person_outline,
                          'Member since',
                          'Jan 2026',
                        ),
                        _buildInfoRow(
                          context,
                          Icons.chat_bubble_outline,
                          'Avg. response time',
                          '2 hours',
                        ),
                        _buildInfoRow(
                          context,
                          Icons.visibility_outlined,
                          'Last active',
                          'Online',
                        ),
                        const SizedBox(height: 24),
                        Text(
                          'Languages',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: textColor,
                          ),
                        ),
                        const SizedBox(height: 16),
                        _buildLanguageRow(
                          context,
                          Icons.translate,
                          'English',
                          'Fluent',
                        ),
                        const SizedBox(height: 24),
                        Text(
                          'Skills',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: textColor,
                          ),
                        ),
                        const SizedBox(height: 16),
                        Wrap(
                          spacing: 8,
                          runSpacing: 8,
                          children: [
                            _buildSkillChip(context, 'React'),
                            _buildSkillChip(context, 'Dart'),
                            _buildSkillChip(context, 'HTML5'),
                            _buildSkillChip(context, 'CSS3'),
                            _buildSkillChip(context, 'Flutter'),
                          ],
                        ),
                      ],
                    ),
                  ),
                  // Gigs Tab - mock UI
                  SingleChildScrollView(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Active Gigs',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: textColor,
                          ),
                        ),
                        const SizedBox(height: 12),
                        _buildGigCard(
                          context,
                          title: 'I will design a modern responsive website',
                          status: 'Active',
                          price: '\$120',
                        ),
                        const SizedBox(height: 12),
                        _buildGigCard(
                          context,
                          title:
                              'I will build your Flutter mobile application',
                          status: 'Active',
                          price: '\$350',
                        ),
                        const SizedBox(height: 24),
                        Text(
                          'Drafts',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: textColor,
                          ),
                        ),
                        const SizedBox(height: 12),
                        _buildGigCard(
                          context,
                          title:
                              'I will create a design system for your brand',
                          status: 'Draft',
                          price: '\$90',
                        ),
                      ],
                    ),
                  ),
                  // Reviews Tab - mock UI
                  SingleChildScrollView(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Reviews',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: textColor,
                          ),
                        ),
                        const SizedBox(height: 12),
                        _buildReviewCard(
                          context,
                          reviewer: 'Alex Johnson',
                          date: 'Jan 12, 2026',
                          rating: 5,
                          comment:
                              'Amazing work! Delivered on time and exceeded expectations.',
                        ),
                        const SizedBox(height: 12),
                        _buildReviewCard(
                          context,
                          reviewer: 'Sophie Lee',
                          date: 'Dec 03, 2025',
                          rating: 4.5,
                          comment:
                              'Great communication and solid results. Would hire again.',
                        ),
                        const SizedBox(height: 12),
                        _buildReviewCard(
                          context,
                          reviewer: 'Michael Chen',
                          date: 'Nov 20, 2025',
                          rating: 5,
                          comment:
                              'Pixel-perfect implementation of our design system. Highly recommended.',
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoRow(
    BuildContext context,
    IconData icon,
    String label,
    String value,
  ) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textColor = isDark ? Colors.white : Colors.black;
    final secondaryTextColor = isDark ? Colors.grey[400] : Colors.grey[600];

    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: secondaryTextColor, size: 20),
          const SizedBox(width: 16),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                label,
                style: TextStyle(color: secondaryTextColor, fontSize: 13),
              ),
              const SizedBox(height: 2),
              Text(
                value,
                style: TextStyle(
                  color: textColor,
                  fontWeight: FontWeight.bold,
                  fontSize: 15,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildLanguageRow(
    BuildContext context,
    IconData icon,
    String language,
    String level,
  ) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textColor = isDark ? Colors.white : Colors.black;
    final secondaryTextColor = isDark ? Colors.grey[400] : Colors.grey[600];
    return Row(
      children: [
        Icon(icon, color: secondaryTextColor),
        const SizedBox(width: 16),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              language,
              style: TextStyle(color: secondaryTextColor, fontSize: 13),
            ),
            Text(
              level,
              style: TextStyle(
                color: textColor,
                fontWeight: FontWeight.bold,
                fontSize: 15,
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildSkillChip(BuildContext context, String label) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Chip(
      label: Text(label),
      backgroundColor: isDark ? const Color(0xFF1F2937) : Colors.grey[200],
      labelStyle: TextStyle(color: isDark ? Colors.white : Colors.black87),
      side: BorderSide.none,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
    );
  }

  Widget _buildGigCard(
    BuildContext context, {
    required String title,
    required String status,
    required String price,
  }) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textColor = isDark ? Colors.white : Colors.black;
    final secondaryTextColor = isDark ? Colors.grey[400] : Colors.grey[700];

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF1F2937) : Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: isDark ? Colors.white10 : const Color(0xFFE5E7EB),
        ),
        boxShadow: [
          if (!isDark)
            BoxShadow(
              color: Colors.black.withOpacity(0.03),
              blurRadius: 8,
              offset: const Offset(0, 4),
            ),
        ],
      ),
      child: Row(
        children: [
          Container(
            width: 56,
            height: 56,
            decoration: BoxDecoration(
              color: isDark
                  ? const Color(0xFF111827)
                  : const Color(0xFFF3F4F6),
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Icon(Icons.design_services, color: Color(0xFFFFD021)),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    color: textColor,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  status,
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                    color: status == 'Active'
                        ? const Color(0xFF16A34A)
                        : secondaryTextColor,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                price,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.bold,
                  color: textColor,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                'Starting at',
                style: TextStyle(
                  fontSize: 11,
                  color: secondaryTextColor,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildReviewCard(
    BuildContext context, {
    required String reviewer,
    required String date,
    required double rating,
    required String comment,
  }) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textColor = isDark ? Colors.white : Colors.black;
    final secondaryTextColor = isDark ? Colors.grey[400] : Colors.grey[700];

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF1F2937) : Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: isDark ? Colors.white10 : const Color(0xFFE5E7EB),
        ),
        boxShadow: [
          if (!isDark)
            BoxShadow(
              color: Colors.black.withOpacity(0.03),
              blurRadius: 8,
              offset: const Offset(0, 4),
            ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CircleAvatar(
                radius: 16,
                backgroundColor:
                    isDark ? Colors.grey[700] : const Color(0xFFE5E7EB),
                child: const Icon(
                  Icons.person,
                  size: 18,
                  color: Colors.white,
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      reviewer,
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        color: textColor,
                      ),
                    ),
                    Text(
                      date,
                      style: TextStyle(
                        fontSize: 12,
                        color: secondaryTextColor,
                      ),
                    ),
                  ],
                ),
              ),
              Row(
                children: [
                  const Icon(Icons.star, size: 16, color: Colors.amber),
                  const SizedBox(width: 4),
                  Text(
                    rating.toStringAsFixed(1),
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.bold,
                      color: textColor,
                    ),
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            comment,
            style: TextStyle(
              fontSize: 13,
              height: 1.4,
              color: secondaryTextColor,
            ),
          ),
        ],
      ),
    );
  }
}
