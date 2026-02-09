import 'package:flutter/material.dart';
import 'gigs_search_screen.dart';

class SearchScreen extends StatelessWidget {
  const SearchScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final backgroundColor = theme.scaffoldBackgroundColor;
    final textColor = isDark ? Colors.white : const Color(0xFF111827);
    final subtitleColor = isDark ? Colors.grey[400] : const Color(0xFF6B7280);

    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: Text(
            'Categories',
            style: TextStyle(color: textColor, fontWeight: FontWeight.bold),
          ),
          backgroundColor: theme.appBarTheme.backgroundColor,
          elevation: 0,
          actions: [
            IconButton(
              icon: Icon(
                Icons.search,
                color: isDark ? Colors.white : const Color(0xFF111827),
              ),
              onPressed: () {
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (context) => const GigsSearchScreen(),
                  ),
                );
              },
            ),
          ],
          bottom: TabBar(
            labelColor: textColor,
            unselectedLabelColor: subtitleColor,
            indicatorColor: textColor, // Usually white or primary in dark mode
            tabs: const [
              Tab(text: 'Categories'),
              Tab(text: 'Interests'),
            ],
          ),
        ),
        backgroundColor: backgroundColor,
        body: TabBarView(
          children: [
            ListView(
              padding: const EdgeInsets.symmetric(vertical: 8),
              children: [
                _buildCategoryItem(
                  context,
                  'Graphics & Design',
                  'Logo & Brand Identity, Art & Illustration',
                  Icons.brush_outlined,
                  Colors.greenAccent, // Placeholder icon color logic if needed
                ),
                _buildCategoryItem(
                  context,
                  'Digital Marketing',
                  'Social Media Marketing, Search Engine Optimization (SEO)',
                  Icons.computer_outlined,
                  Colors.blueAccent,
                ),
                _buildCategoryItem(
                  context,
                  'Writing & Translation',
                  'Articles & Blog Posts, Translation',
                  Icons.edit_note_outlined,
                  Colors.orangeAccent,
                ),
                _buildCategoryItem(
                  context,
                  'Video & Animation',
                  'Video Editing, Video Ads & Commercials',
                  Icons.play_circle_outline,
                  Colors.redAccent,
                ),
                _buildCategoryItem(
                  context,
                  'Music & Audio',
                  'Music Producers, Singers & Vocalists',
                  Icons.music_note_outlined,
                  Colors.purpleAccent,
                ),
                _buildCategoryItem(
                  context,
                  'Programming & Tech',
                  'Website Development, Website Maintenance',
                  Icons.code_outlined,
                  Colors.tealAccent,
                ),
                _buildCategoryItem(
                  context,
                  'Data',
                  'Data Science & ML, Databases',
                  Icons.bar_chart_outlined,
                  Colors.cyanAccent,
                ),
                _buildCategoryItem(
                  context,
                  'Business',
                  'Business Formation & Consulting, Operations & Management',
                  Icons.business_center_outlined,
                  Colors.brown,
                ),
                _buildCategoryItem(
                  context,
                  'Finance',
                  'Financial Planning, Accounting',
                  Icons.attach_money_outlined,
                  Colors.green,
                ),
              ],
            ),
            const Center(child: Text('Interests Content Placeholder')),
          ],
        ),
      ),
    );
  }

  Widget _buildCategoryItem(
    BuildContext context,
    String title,
    String subtitle,
    IconData icon,
    Color iconColorHelper, // Just to vary mock icons if we wanted
  ) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final textColor = isDark ? Colors.white : const Color(0xFF111827);
    final subtitleColor = isDark ? Colors.grey[500] : const Color(0xFF6B7280);

    return ListTile(
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      leading: Icon(
        icon,
        size: 28,
        color: isDark ? Colors.grey[400] : Colors.grey[600],
      ),

      // Screenshot shows simple grey line icons.
      title: Text(
        title,
        style: TextStyle(
          fontSize: 18, // Slightly larger looking
          fontWeight: FontWeight.bold,
          color: textColor,
        ),
      ),
      subtitle: Padding(
        padding: const EdgeInsets.only(top: 4.0),
        child: Text(
          subtitle,
          style: TextStyle(fontSize: 14, color: subtitleColor),
          maxLines: 2,
          overflow: TextOverflow.ellipsis,
        ),
      ),
      onTap: () {},
    );
  }
}
