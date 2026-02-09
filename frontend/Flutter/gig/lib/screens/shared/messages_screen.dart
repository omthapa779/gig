import 'package:flutter/material.dart';
import 'chat_screen.dart';

class MessagesScreen extends StatelessWidget {
  const MessagesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Inbox',
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
        actions: [
          IconButton(
            icon: Icon(
              Icons.settings_outlined,
              color: isDark ? Colors.white : const Color(0xFF6B7280),
            ),
            onPressed: () {},
          ),
        ],
      ),
      backgroundColor: theme.scaffoldBackgroundColor,
      body: ListView.separated(
        itemCount: 5,
        separatorBuilder: (context, index) => Divider(
          height: 1,
          color: isDark ? Colors.white10 : Colors.grey.withOpacity(0.1),
        ),
        itemBuilder: (context, index) {
          return _buildMessageItem(context, index);
        },
      ),
    );
  }

  Widget _buildMessageItem(BuildContext context, int index) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    final names = [
      'Alice Smith',
      'Bob Johnson',
      'Carol White',
      'Dave Brown',
      'Eve Davis',
    ];
    final messages = [
      'Hey, I have a question about the project.',
      'The deliverables look great!',
      'Can we reschedule our meeting?',
      'Payment has been released.',
      'Thanks for your hard work!',
    ];
    final times = [
      '10:30 AM',
      'Yesterday',
      'Yesterday',
      '2 days ago',
      '1 week ago',
    ];

    return ListTile(
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      tileColor: isDark ? theme.cardColor : Colors.white,
      leading: CircleAvatar(
        backgroundColor: isDark ? Colors.grey[700] : const Color(0xFFE5E7EB),
        child: Text(
          names[index][0],
          style: TextStyle(
            color: isDark ? Colors.white : const Color(0xFF6B7280),
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      title: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            names[index],
            style: TextStyle(
              fontWeight: FontWeight.bold,
              color: isDark ? Colors.white : const Color(0xFF111827),
            ),
          ),
          Text(
            times[index],
            style: TextStyle(
              fontSize: 12,
              color: isDark ? Colors.grey[400] : const Color(0xFF9CA3AF),
            ),
          ),
        ],
      ),
      subtitle: Padding(
        padding: const EdgeInsets.only(top: 4.0),
        child: Text(
          messages[index],
          style: TextStyle(
            color: isDark ? Colors.grey[400] : const Color(0xFF6B7280),
          ),
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
      ),
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => ChatScreen(userName: names[index]),
          ),
        );
      },
    );
  }
}
