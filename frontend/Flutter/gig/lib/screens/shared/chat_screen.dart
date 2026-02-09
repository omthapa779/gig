import 'package:flutter/material.dart';

class ChatScreen extends StatelessWidget {
  final String userName;

  const ChatScreen({super.key, required this.userName});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          userName,
          style: TextStyle(
            color:
                theme.appBarTheme.titleTextStyle?.color ??
                (isDark ? Colors.white : const Color(0xFF111827)),
          ),
        ),
        backgroundColor: theme.appBarTheme.backgroundColor,
        elevation: 1,
        iconTheme: IconThemeData(
          color: isDark ? Colors.white : const Color(0xFF111827),
        ),
      ),
      backgroundColor: theme.scaffoldBackgroundColor,
      body: Column(
        children: [
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(16),
              children: [
                _buildMessageBubble(
                  context,
                  'Hello! How are you?',
                  isMe: false,
                ),
                _buildMessageBubble(
                  context,
                  'I am doing great, thanks for asking!',
                  isMe: true,
                ),
                _buildMessageBubble(
                  context,
                  'When can you start the project?',
                  isMe: false,
                ),
                _buildMessageBubble(
                  context,
                  'I can start immediately.',
                  isMe: true,
                ),
              ],
            ),
          ),
          _buildMessageInput(context),
        ],
      ),
    );
  }

  Widget _buildMessageBubble(
    BuildContext context,
    String text, {
    required bool isMe,
  }) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Align(
      alignment: isMe ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: isMe
              ? const Color(0xFFFFD021)
              : (isDark ? const Color(0xFF374151) : Colors.white),
          borderRadius: BorderRadius.only(
            topLeft: const Radius.circular(12),
            topRight: const Radius.circular(12),
            bottomLeft: isMe ? const Radius.circular(12) : Radius.zero,
            bottomRight: isMe ? Radius.zero : const Radius.circular(12),
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 5,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Text(
          text,
          style: TextStyle(
            color: isMe
                ? const Color(0xFF111827)
                : (isDark ? Colors.white : const Color(0xFF111827)),
          ),
        ),
      ),
    );
  }

  Widget _buildMessageInput(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      padding: const EdgeInsets.all(16),
      color: isDark ? const Color(0xFF1F2937) : Colors.white,
      child: Row(
        children: [
          Expanded(
            child: TextField(
              style: TextStyle(color: isDark ? Colors.white : Colors.black),
              decoration: InputDecoration(
                hintText: 'Type a message...',
                hintStyle: TextStyle(
                  color: isDark ? Colors.grey[400] : Colors.grey,
                ),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(24),
                  borderSide: BorderSide(
                    color: isDark
                        ? Colors.white24
                        : Colors.grey.withOpacity(0.3),
                  ),
                ),
                enabledBorder: OutlineInputBorder(
                  // Ensure enabled border is visible in dark mode
                  borderRadius: BorderRadius.circular(24),
                  borderSide: BorderSide(
                    color: isDark
                        ? Colors.white24
                        : Colors.grey.withOpacity(0.3),
                  ),
                ),
                contentPadding: const EdgeInsets.symmetric(horizontal: 16),
                filled: true,
                fillColor: isDark
                    ? const Color(0xFF374151)
                    : const Color(0xFFF9FAFB),
              ),
            ),
          ),
          const SizedBox(width: 8),
          CircleAvatar(
            backgroundColor: const Color(0xFFFFD021),
            child: IconButton(
              icon: const Icon(Icons.send, color: Color(0xFF111827), size: 18),
              onPressed: () {},
            ),
          ),
        ],
      ),
    );
  }
}
