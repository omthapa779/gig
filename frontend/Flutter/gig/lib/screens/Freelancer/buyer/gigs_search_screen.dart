import 'package:flutter/material.dart';
import 'buyer_home_screen.dart'; // Reusing GigCard

class GigsSearchScreen extends StatefulWidget {
  const GigsSearchScreen({super.key});

  @override
  State<GigsSearchScreen> createState() => _GigsSearchScreenState();
}

class _GigsSearchScreenState extends State<GigsSearchScreen> {
  final TextEditingController _searchController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final textColor = isDark ? Colors.white : const Color(0xFF111827);

    return DefaultTabController(
      length: 2,
      child: Scaffold(
        backgroundColor: theme.scaffoldBackgroundColor,
        appBar: AppBar(
          backgroundColor: theme.appBarTheme.backgroundColor,
          elevation: 0,
          leading: IconButton(
            icon: Icon(
              Icons.arrow_back,
              color: isDark ? Colors.white : const Color(0xFF6B7280),
            ),
            onPressed: () => Navigator.pop(context),
          ),
          title: Container(
            height: 40,
            decoration: BoxDecoration(
              color: isDark ? Colors.transparent : Colors.transparent,
            ),
            child: TextField(
              controller: _searchController,
              autofocus: true,
              style: TextStyle(color: textColor),
              decoration: InputDecoration(
                hintText: 'Search services',
                hintStyle: TextStyle(
                  color: isDark ? Colors.grey[400] : Colors.grey[500],
                  fontSize: 18,
                  fontWeight: FontWeight.w500,
                ),
                border: InputBorder.none,
                contentPadding: const EdgeInsets.only(bottom: 8),
              ),
            ),
          ),
          bottom: TabBar(
            labelColor: textColor,
            unselectedLabelColor: isDark ? Colors.grey[500] : Colors.grey[600],
            indicatorColor: isDark ? Colors.white : Colors.black,
            indicatorWeight: 3,
            labelStyle: const TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 16,
            ),
            tabs: const [
              Tab(text: 'Gigs'),
              Tab(text: 'Sellers'),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            // Gigs Tab
            SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Recently viewed Gigs',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: textColor,
                          ),
                        ),
                        TextButton(
                          onPressed: () {},
                          child: const Text(
                            'Manage',
                            style: TextStyle(
                              color: Colors.white,
                              decoration: TextDecoration.underline,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(
                    height: 280,
                    child: ListView(
                      scrollDirection: Axis.horizontal,
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      children: const <Widget>[
                        GigCard(
                          imageUrl: 'https://via.placeholder.com/300x200',
                          sellerName: 'Fantech Labs',
                          level: 'Top Rated',
                          title:
                              'Develop full stack website or be your front end developer',
                          rating: '5.0',
                          price: '100',
                        ),
                        SizedBox(width: 16),
                        GigCard(
                          imageUrl: 'https://via.placeholder.com/300x200',
                          sellerName: 'Abdullah',
                          level: 'Level 2',
                          title:
                              'Build rebuild custom website development full stack',
                          rating: '4.9',
                          price: '80',
                        ),
                        SizedBox(width: 16),
                        GigCard(
                          imageUrl: 'https://via.placeholder.com/300x200',
                          sellerName: 'WebDevPro',
                          level: null,
                          title: 'Be full stack developer web developer',
                          rating: '5.0',
                          price: '120',
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            // Sellers Tab (Placeholder)
            Center(
              child: Text(
                'Search for Sellers',
                style: TextStyle(color: textColor),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
