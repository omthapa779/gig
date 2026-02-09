import 'package:flutter/material.dart';

class BriefsScreen extends StatelessWidget {
  const BriefsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Briefs'),
          bottom: TabBar(
            indicatorColor: isDark
                ? const Color(0xFFFFD021)
                : const Color(0xFFFFD021),
            labelColor: isDark ? Colors.white : Colors.black,
            unselectedLabelColor: Colors.grey,
            tabs: const [
              Tab(text: 'Your Matches'),
              Tab(text: 'Responses Sent'),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            // Your Matches
            Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.find_in_page_outlined,
                    size: 80,
                    color: Colors.grey[400],
                  ),
                  const SizedBox(height: 20),
                  const Text(
                    'No new brief matches...',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 10),
                  const Padding(
                    padding: EdgeInsets.symmetric(horizontal: 40),
                    child: Text(
                      'We\'ll notify you as soon as a brief comes in that matches your skills.',
                      textAlign: TextAlign.center,
                      style: TextStyle(color: Colors.grey),
                    ),
                  ),
                ],
              ),
            ),
            // Responses Sent
            const Center(child: Text('No responses sent yet.')),
          ],
        ),
      ),
    );
  }
}
