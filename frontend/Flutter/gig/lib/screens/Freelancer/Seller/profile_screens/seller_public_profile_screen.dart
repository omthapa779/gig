import 'package:flutter/material.dart';

class SellerPublicProfileScreen extends StatelessWidget {
  const SellerPublicProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textColor = isDark ? Colors.white : Colors.black;
    final secondaryTextColor = isDark ? Colors.grey[400] : Colors.grey[600];

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
        child: NestedScrollView(
          headerSliverBuilder: (context, innerBoxIsScrolled) {
            return [
              SliverList(
                delegate: SliverChildListDelegate([
                  Center(
                    child: Column(
                      children: [
                        Stack(
                          children: [
                            const CircleAvatar(
                              radius: 40,
                              backgroundImage: NetworkImage(
                                'https://via.placeholder.com/150',
                              ), // Replace with actual image
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
                ]),
              ),
              SliverPersistentHeader(
                delegate: _SliverAppBarDelegate(
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
                ),
                pinned: true,
              ),
            ];
          },
          body: TabBarView(
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
                    RichText(
                      text: TextSpan(
                        style: TextStyle(color: textColor, height: 1.5),
                        children: [
                          const TextSpan(
                            text:
                                'I develop custom web solutions for local businesses and independent startups, focusing on modern UI/UX and rapid... ',
                          ),
                          TextSpan(
                            text: 'more',
                            style: const TextStyle(
                              fontWeight: FontWeight.bold,
                              decoration: TextDecoration.underline,
                            ),
                            onEnter: (event) {}, // Placeholder
                          ),
                        ],
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
              // Gigs Tab (Placeholder)
              const Center(child: Text('Gigs go here')),
              // Reviews Tab (Placeholder)
              const Center(child: Text('Reviews go here')),
            ],
          ),
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
}

class _SliverAppBarDelegate extends SliverPersistentHeaderDelegate {
  final TabBar _tabBar;

  _SliverAppBarDelegate(this._tabBar);

  @override
  double get minExtent => _tabBar.preferredSize.height + 1; // +1 for the divider if needed
  @override
  double get maxExtent => _tabBar.preferredSize.height + 1;

  @override
  Widget build(
    BuildContext context,
    double shrinkOffset,
    bool overlapsContent,
  ) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Container(
      color: Theme.of(context).scaffoldBackgroundColor,
      child: Stack(
        alignment: Alignment.bottomCenter,
        children: [
          Container(
            height: 1,
            color: isDark ? Colors.white10 : Colors.grey[300],
          ),
          _tabBar,
        ],
      ),
    );
  }

  @override
  bool shouldRebuild(_SliverAppBarDelegate oldDelegate) {
    return false;
  }
}
