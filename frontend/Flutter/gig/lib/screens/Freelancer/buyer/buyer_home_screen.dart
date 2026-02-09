import 'package:flutter/material.dart';
import 'gigs_search_screen.dart';

class BuyerHomeScreen extends StatelessWidget {
  final VoidCallback? onSearchTap;

  const BuyerHomeScreen({super.key, this.onSearchTap});

  void _navigateToSearch(BuildContext context) {
    Navigator.of(
      context,
    ).push(MaterialPageRoute(builder: (context) => const GigsSearchScreen()));
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          'Gig.',
          style: TextStyle(
            color: isDark ? Colors.white : const Color(0xFF111827),
            fontWeight: FontWeight.bold,
            fontSize: 24,
            fontFamily: 'Roboto',
          ),
        ),
        backgroundColor: theme.appBarTheme.backgroundColor,
        elevation: 0,
        actions: [
          IconButton(
            icon: Icon(
              Icons.search,
              color: isDark ? Colors.white : const Color(0xFF6B7280),
            ),
            onPressed: () => _navigateToSearch(context),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Search Bar
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: GestureDetector(
                onTap: () => _navigateToSearch(context),
                child: Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 12,
                  ),
                  decoration: BoxDecoration(
                    color: isDark ? Colors.grey[800] : Colors.white,
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(
                      color: isDark ? Colors.transparent : Colors.grey[300]!,
                    ),
                  ),
                  child: Row(
                    children: [
                      Icon(
                        Icons.search,
                        color: isDark ? Colors.grey[400] : Colors.grey[500],
                      ),
                      const SizedBox(width: 8),
                      Text(
                        'Search services',
                        style: TextStyle(
                          color: isDark ? Colors.grey[400] : Colors.grey[500],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),

            // Popular Services
            _buildSectionHeader(context, 'Popular Services', onSeeAll: () {}),
            SizedBox(
              height: 160,
              child: ListView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                children: [
                  _buildPopularServiceCard(
                    context,
                    'Logo Design',
                    Colors.greenAccent,
                    Icons.design_services,
                  ),
                  const SizedBox(width: 12),
                  _buildPopularServiceCard(
                    context,
                    'AI Artists',
                    Colors.orangeAccent,
                    Icons.brush,
                  ),
                  const SizedBox(width: 12),
                  _buildPopularServiceCard(
                    context,
                    'Logo Animation',
                    Colors.purpleAccent,
                    Icons.animation,
                  ),
                  const SizedBox(width: 12),
                  _buildPopularServiceCard(
                    context,
                    'Voice Over',
                    Colors.blueAccent,
                    Icons.mic,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Recently Viewed
            _buildSectionHeader(
              context,
              'Recently viewed & more',
              onSeeAll: () {},
            ),
            SizedBox(
              height: 280,
              child: ListView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                children: [
                  const GigCard(
                    imageUrl: 'https://via.placeholder.com/300x200',
                    sellerName: 'Fantech Labs',
                    level: 'Top Rated',
                    title:
                        'Develop full stack website or be your front end developer',
                    rating: '5.0',
                    price: '100',
                  ),
                  const SizedBox(width: 16),
                  const GigCard(
                    imageUrl: 'https://via.placeholder.com/300x200',
                    sellerName: 'Abdullah',
                    level: 'Level 2',
                    title:
                        'Build rebuild custom website development full stack',
                    rating: '4.9',
                    price: '150',
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Promo Banner
            _buildPromoBanner(
              context,
              'Expand your online presence',
              const Color(0xFF4A148C), // Deep Purple
            ),
            const SizedBox(height: 24),

            // Invite Banner (Moved Up)
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 16),
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: const Color(0xFFFFD1DC), // Light Pink
                borderRadius: BorderRadius.circular(8),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Invite friends & get up to \$100',
                    style: TextStyle(
                      color: Color(0xFF880E4F),
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Introduce your friends to the fastest way to get things done.',
                    style: TextStyle(color: Color(0xFF880E4F)),
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Invite Friends →',
                    style: TextStyle(
                      color: Color(0xFF880E4F),
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Inspired by browsing history
            _buildSectionHeader(context, 'Inspired by your browsing history'),
            SizedBox(
              height: 280,
              child: ListView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                children: [
                  const GigCard(
                    imageUrl: 'https://via.placeholder.com/300x200',
                    sellerName: 'ShopifyExpert',
                    level: 'Level 1',
                    title:
                        'Build you a ready to sell dropshipping shopify store',
                    rating: '4.9',
                    price: '160',
                  ),
                  const SizedBox(width: 16),
                  const GigCard(
                    imageUrl: 'https://via.placeholder.com/300x200',
                    sellerName: 'DesignerPro',
                    level: null,
                    title: 'Design redesign shopify website',
                    rating: '4.9',
                    price: '90',
                  ),
                ],
              ),
            ),
            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionHeader(
    BuildContext context,
    String title, {
    VoidCallback? onSeeAll,
  }) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(
            child: Text(
              title,
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: isDark ? Colors.white : const Color(0xFF111827),
              ),
            ),
          ),
          if (onSeeAll != null)
            TextButton(
              onPressed: onSeeAll,
              child: const Text(
                'See All',
                style: TextStyle(color: Color(0xFFFFD021)),
              ), // Yellow
            ),
        ],
      ),
    );
  }

  Widget _buildPopularServiceCard(
    BuildContext context,
    String title,
    Color color,
    IconData icon,
  ) {
    return Container(
      width: 120,
      decoration: BoxDecoration(
        color: const Color(0xFF222222),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Stack(
        children: [
          Positioned.fill(
            child: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8),
                color: const Color(0xFF2C2C2C),
              ),
              child: Center(
                child: Icon(icon, size: 48, color: color.withOpacity(0.8)),
              ),
            ),
          ),
          Positioned(
            bottom: 12,
            left: 12,
            child: Text(
              title,
              style: const TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPromoBanner(
    BuildContext context,
    String title,
    Color backgroundColor,
  ) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      height: 180,
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Stack(
        children: [
          Padding(
            padding: const EdgeInsets.all(24.0),
            child: SizedBox(
              width: 200,
              child: Text(
                title,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
          // Graphic placeholder
          Positioned(
            right: -20,
            bottom: -20,
            child: Icon(
              Icons.view_in_ar,
              size: 150,
              color: Colors.white.withOpacity(0.2),
            ),
          ),
        ],
      ),
    );
  }
}

class GigCard extends StatefulWidget {
  final String imageUrl;
  final String sellerName;
  final String? level;
  final String title;
  final String rating;
  final String price;

  const GigCard({
    super.key,
    required this.imageUrl,
    required this.sellerName,
    this.level,
    required this.title,
    required this.rating,
    required this.price,
  });

  @override
  State<GigCard> createState() => _GigCardState();
}

class _GigCardState extends State<GigCard> {
  bool isLiked = false;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      width: 200,
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF1F2937) : Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: isDark ? Colors.transparent : Colors.grey[200]!,
        ),
        boxShadow: [
          if (!isDark)
            BoxShadow(
              color: Colors.grey.withOpacity(0.1),
              blurRadius: 4,
              offset: const Offset(0, 2),
            ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Image Placeholder
          Container(
            height: 100,
            decoration: BoxDecoration(
              color: Colors.grey[300],
              borderRadius: const BorderRadius.vertical(
                top: Radius.circular(8),
              ),
            ),
            child: Center(child: Icon(Icons.image, color: Colors.grey[500])),
          ),
          Padding(
            padding: const EdgeInsets.all(12.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    CircleAvatar(
                      radius: 10,
                      backgroundColor: Colors.grey[400],
                      child: const Icon(
                        Icons.person,
                        size: 12,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        widget.sellerName,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 12,
                          color: isDark ? Colors.white : Colors.black87,
                        ),
                      ),
                    ),
                    if (widget.level != null)
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 4,
                          vertical: 2,
                        ),
                        decoration: BoxDecoration(
                          color: Colors.amber[800],
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Text(
                          widget.level!,
                          style: const TextStyle(
                            fontSize: 10,
                            color: Colors.white,
                          ),
                        ),
                      ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  widget.title,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    fontSize: 14,
                    color: isDark ? Colors.grey[300] : Colors.black87,
                  ),
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    const Icon(Icons.star, size: 14, color: Colors.amber),
                    const SizedBox(width: 4),
                    Text(
                      widget.rating,
                      style: const TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                        color: Colors.amber,
                      ),
                    ),
                    const Text(
                      ' (23)',
                      style: TextStyle(fontSize: 12, color: Colors.grey),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    GestureDetector(
                      onTap: () {
                        setState(() {
                          isLiked = !isLiked;
                        });
                      },
                      child: Icon(
                        isLiked ? Icons.favorite : Icons.favorite_border,
                        size: 20,
                        color: isLiked ? Colors.red : Colors.grey,
                      ),
                    ),
                    Text(
                      'From \$${widget.price}',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 14,
                        color: isDark ? Colors.white : Colors.black87,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
